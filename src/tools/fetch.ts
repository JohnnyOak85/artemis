import { readFileSync } from "fs";
import { resolve } from "path";

const projectRoot = resolve(__dirname, "../../");
const databasePath = `${projectRoot}/database`;

const fetchDocument = <DocType>(doc: string): DocType | null => {
  try {
    const path = `${databasePath}/${doc}.json`;
    const file = readFileSync(path).toString("utf8");

    return JSON.parse(file);
  } catch (error) {
    return null;
  }
};

export default fetchDocument;
