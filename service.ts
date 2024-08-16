import { writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const SERVICE_NAME = `artemis`;
const ENTRY_POINT = `src/start.ts`;
const NODE_TYPE = "ts-node";
const SYSTEMD_DIR = "/etc/systemd/system";

const currentDir = process.cwd();
const serviceFilePath = join(SYSTEMD_DIR, `${SERVICE_NAME}.service`);
const nodePath = execSync(`which ${NODE_TYPE}`, { encoding: "utf8" }).trim();
const execStart = `${nodePath} ${join(currentDir, ENTRY_POINT)}`;

const template = `
[Unit]
Description=${SERVICE_NAME.charAt(0).toUpperCase()}${SERVICE_NAME.slice(1)}
After=network.target

[Service]
ExecStart=${execStart}
Restart=always
User=${process.env.USER}
Environment=NODE_ENV=production
WorkingDirectory=${currentDir}
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=${SERVICE_NAME}

[Install]
WantedBy=multi-user.target
`;

// Write the service file content to the specified path
try {
  writeFileSync(serviceFilePath, template);
  console.log(`Service file created at ${serviceFilePath}`);
} catch (error) {
  console.error(`Failed to create service file: ${error.message}`);
  process.exit();
}

// Reload the systemd daemon to recognize the new service
try {
  execSync("sudo systemctl daemon-reload");
  console.log("Systemd daemon reloaded");
} catch (error) {
  console.error(`Failed to reload systemd daemon: ${error.message}`);
  process.exit();
}

// Enable the service to start at boot
try {
  execSync(`sudo systemctl enable ${SERVICE_NAME}`);
  console.log("Service enabled to start at boot");
} catch (error) {
  console.error(`Failed to enable service: ${error.message}`);
  process.exit();
}

// Start the service
try {
  execSync(`sudo systemctl start ${SERVICE_NAME}`);
  console.log("Service started");
} catch (error) {
  console.error(`Failed to start service: ${error.message}`);
  process.exit();
}
