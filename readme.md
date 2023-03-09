<h1 align="center">
  Artemis20<br>
  <img src="https://cdn.discordapp.com/app-icons/698208086116007937/059fb0a99a712a052960d4bb5907576c.png" /><br>
</h1>

<p align="center">An all purpose Discord bot</p>

## Table of Contents

---

-   [Table of Contents](#table-of-contents)
-   [Introduction](#introduction)
-   [Discord Commons](#discord-commons)
    -   [Buttons](#buttons)
    -   [Channels](#channels)
    -   [Commands](#commands)
    -   [Embeds](#embeds)
    -   [Events](#events)
    -   [Intents](#intents)
    -   [Members](#members)
    -   [Permissions](#permissions)
    -   [Roles](#roles)
    -   [Start](#start)
-   [Tools Commons](#tools-commons)
    -   [Api](#api)
    -   [Calculator](#calculator)
    -   [Environment](#environment)
    -   [Gamble](#gamble)
    -   [Log](#log)
    -   [Quirk](#quirk)
    -   [Schedule](#schedule)
    -   [Time](#time)
    -   [Word](#word)
-   [Modules](#modules)
    -   [Tales of Murwelgrave](#tales-of-murwelgrave)
    -   [Moderation](#moderation)
    -   [Quote](#quote)
    -   [Reminder](#reminder)
    -   [Speech](#speech)
    -   [Story](#story)

## Introduction

---

Artemis is my all purpose bot with various modules. It was born from parts of other bots.  
The first bot I created was [ToriBot](https://github.com/JohnnyOak85/DiscordBot) which started as a moderation bot but then expanded to have more functionalities.  
I then had the idea for a Discord based game, but since ToriBot was getting old and cluttered, I decided to create [Tales of Murwelgrave](https://github.com/JohnnyOak85/Tales-of-Murwelgrave). It worked fairly well for an Halloween season during the month of October 2022.  
Eventually I decided to create Artemis as a speech bot and [Warden](https://github.com/JohnnyOak85/Warden) as a moderation bot, but since I don't have much need for a moderation bot, I decided to retire Warden.  
Since then, I've been refactoring Artemis to use modular microservices, thus the need for multiple bots stopped making sense. So Artemis ended up absorbing the functionalities of all previous bots (including Warden, just in case).  
More modules will be added and I'd like to dabble into GTP3 so that Artemis can have a brain.

## Discord Commons

---

Abstracts all needed types and methods from [Discord.js](https://discord.js.org/#/).

### Buttons

|                 |                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ButtonStyles    | Object containing the possible button styles (added per use) from [ButtonStyle](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle). |
| .buildButton    | Returns a [ButtonBuilder](https://discord.js.org/#/docs/builders/main/class/ButtonBuilder) object.                                                         |
| .buildButtonRow | Returns a [ActionRowBuilder](https://discord.js.org/#/docs/builders/main/class/ActionRowBuilder) object.                                                   |

### Channels

|              |                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ChannelTypes | Object containing the possible channel types (added per use) from [ChannelType](https://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType).      |
| .getChannel  | Returns a [TextChannel](https://discord.js.org/#/docs/discord.js/main/class/TextChannel) or the guild's system channel (which is either a TextChannel or null). |

### Commands

|                   |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| .buildCommand     | Returns a [SlashCommandBuilder](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder) object. |
| .getCommand       | Returns an object with an `execute` function to actually execute the given command.                            |
| .registerCommands | Registers all commands to the client API.                                                                      |

### Embeds

|                 |                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| .buildEmbed     | Returns a [EmbedBuilder](https://discord.js.org/#/docs/builders/main/class/EmbedBuilder) object all wrapped and ready to be sent. |
| .buildEmbedData | Returns a [EmbedBuilder](https://discord.js.org/#/docs/builders/main/class/EmbedBuilder) object array.                            |

### Events

|        |                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Events | Object containing the possible event types (added per use) from [Events](https://discord.js.org/#/docs/discord.js/main/typedef/Events). |

### Intents

|         |                                                                                                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intents | Object containing the possible client intents (added per use) from [GatewayIntentBits](https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits). |

### Members

|                  |                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| .getMember       | Return a [GuildMember](https://discord.js.org/#/docs/discord.js/main/class/GuildMember) object by id. |
| .getRandomMember | Returns a string containing the nickname, display name or username of a random member.                |

### Permissions

|             |                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Permissions | Object containing the command permissions (added per use) from [PermissionFlagsBits](https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits). |

### Roles

|                 |                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| .getPlayerRoles | Returns an array containing a member's [Roles](https://discord.js.org/#/docs/discord.js/main/class/Role).                       |
| .getGuildRole   | Tries to find a [Role](https://discord.js.org/#/docs/discord.js/main/class/Role) within the guild, otherwise it returns a null. |

### Start

|        |                                                            |
| ------ | ---------------------------------------------------------- |
| .start | Creates a new the Discord client and registers all events. |

## Tools Commons

---

### Api

Connects to my personal server using [Axios](https://axios-http.com/).

|      |                                    |
| ---- | ---------------------------------- |
| .get | Sends a GET request to the server. |
| .put | Sends a PUT request to the server. |

### Calculator

Uses specific [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) methods.

|            |                                              |
| ---------- | -------------------------------------------- |
| .divide    | Applies division to a number.                |
| .multiply  | Applies multiplication to a number.          |
| .roundDown | Rounds a number down to the nearest integer. |

### Environment

Deals with local environment using [Dotenv](https://www.dotenv.org/).

|        |                                                         |
| ------ | ------------------------------------------------------- |
| .get   | Returns an object with the local environment variables. |
| .start | Registers the strings stored in a `.env`.               |

### Gamble

Various methods dealing with [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

|              |                                                     |
| ------------ | --------------------------------------------------- |
| .random      | Returns a random integer number.                    |
| .randomIndex | Returns a random array index.                       |
| .rollDice    | Randomizes from one to six and returns a boolean.   |
| .roshambo    | Randomizes from one to three and returns a boolean. |
| .tossCoin    | Randomizes from one to two and returns a boolean.   |

### Log

Uses [Winston](https://github.com/winstonjs/winston#readme) to register logs locally.

|        |                         |
| ------ | ----------------------- |
| .error | Registers an error log. |

### Quirk

An extension to the speech module that can add a speech quirk to the messages before being sent.

|      |                                                    |
| ---- | -------------------------------------------------- |
| .get | Transforms text by a random speech quirk.          |
| .try | Same as `.get` but with a 50% chance of happening. |

### Schedule

Uses [Cron](https://github.com/kelektiv/node-cron#readme) to schedule jobs to be done when the time comes.

|                    |                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------- |
| .getJob            | Returns a CronJob object.                                                                     |
| .generateTimestamp | Returns a [Cron string](https://crontab.guru/) for a random minute, hour and day of the week. |
| .run               | Schedules a job to be run systematically.                                                     |
| .runOnce           | Schedules a job to be run once.                                                               |
| .runTemp           | Schedules a job to be run until it needs to be stopped.                                       |
| .stopJob           | Stops a job that is currently running.                                                        |
| .NOON              | A [Cron string](https://crontab.guru/) for every day at 12:00.                                |
| .WEEK_START        | A [Cron string](https://crontab.guru/) for 00:00 on Sunday.                                   |

### Time

Deals with time using [Moment](https://momentjs.com/).

|               |                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------ |
| .get          | Returns a string with the current date.                                                    |
| .getTimestamp | Returns the [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) of the current date. |

### Word

Manipulates strings.

|                 |                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| .append         | Adds a suffix to a string.                                                                                                              |
| .buildList      | Transforms a string array into a multiple lined string.                                                                                 |
| .replaceAll     | Beefed up version of [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). |
| .replaceAllCase | Beefed up version of `.replaceAll`.                                                                                                     |
| .replaceLast    | Replaces the last instance of a value within a string.                                                                                  |
| .startsWithAny  | Checks if a string starts with a certain value.                                                                                         |

## Modules

---

### Tales of Murwelgrave

An RPG style game where the player gets to engage randomly generated monsters. As they do, a battle will ensue, if they win their stats will go up and will be stored into the database. There are also achievements to be gained.

### Moderation

WIP

### Quote

Every Sunday at midnight, it chooses a random week day and a random time to send a quote from a list it gets from the database.

### Reminder

Every day at noon, it calls the database to check for new reminders. If there are any new ones, it starts a job to send an embed with the reminder at the stipulated time.
Reminders can be of three types:

-   Birthday: Self explanatory.
-   Celebration: A special date to be celebrated.
-   Release: The release date for a game or movie.

### Speech

Every time a message is sent in the guild, it will scan it and choose an action to take.

-   Greeting: If the message contains a mention to Artemis and it has yet to respond with something else, it will reply with a random greeting.
-   Prediction: If the message ends with a question mark and Artemis was mentioned it will reply with an [Magic 8 Ball](https://magic-8ball.com/) style response. If it wasn't mentioned, there is still a one in three chance it will respond.
-   Reaction: If the message contains a certain trigger word from a stored list, there is a one in three chance it will react to the message.
-   Response: If the message contains a certain trigger word from a stored list, there is a one in three chance it will respond to the message, but only if it hasn't sent a prediction before.

### Story

Every Sunday at midnight, it chooses a random week day and a random time to send a randomly generated story with a randomly selected member as the protagonist.
