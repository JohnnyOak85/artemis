# Artemis

A friendly bot that engages members in a Discord guild.

# Table of Contents

-   [Commons](#commons)
    -   [Discord](#discord)
    -   [Api](#api)
    -   [Environment](#environment)
    -   [Gamble](#gamble)
    -   [Log](#log)
    -   [Quirk](#quirk)
    -   [Schedule](#schedule)
    -   [Time](#time)
    -   [Word](#word)
-   [Quote](#quote)
-   [Reminder](#reminder)
-   [Speech](#speech)
    -   [Greeting](#greeting)
    -   [Prediction](#prediction)
    -   [Reaction](#reaction)
    -   [Response](#response)
-   [Story](#story)

## **Commons**

A collections of types and tools common across all modules.

### **Discord**

Abstracts all needed types and methods from [Discord.js](https://discord.js.org/#/).

| Method Name      | Functionality                                                           |
| ---------------- | ----------------------------------------------------------------------- |
| .buildCommand    | Returns a Discord slash command object.                                 |
| .buildEmbed      | Returns a Discord message embed object.                                 |
| .getChannel      | Returns a text channel or the guild's system channel.                   |
| .getMember       | Returns a member's nickname, display name or the client's own username. |
| .registerCommand | Registers the a slash command object.                                   |
| .start           | Creates a new the Discord client and registers all events.              |

### **Api**

Connects to my personal server using [Axios](https://axios-http.com/).

| Method Name | Functionality                      |
| ----------- | ---------------------------------- |
| .get        | Sends a GET request to the server. |
| .put        | Sends a PUT request to the server. |

### **Environment**

Deals with local environment using [Dotenv](https://www.dotenv.org/).

| Method Name | Functionality                                           |
| ----------- | ------------------------------------------------------- |
| .get        | Returns an object with the local environment variables. |
| .start      | Registers the strings stored in a `.env`.               |

### **Gamble**

Various methods dealing with [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
| Method Name | Functionality |
| ---------------- | ---------------------------------------------------------------------- |
| .random | Returns a random integer number. |
| .randomIndex | Returns a random array index. |
| .rollDice | Randomizes from one to six and returns a boolean. |
| .roshambo | Randomizes from one to three and returns a boolean. |
| .tossCoin | Randomizes from one to two and returns a boolean. |

### **Log**

Uses [Winston](https://github.com/winstonjs/winston#readme) to register logs locally.

| Method Name | Functionality           |
| ----------- | ----------------------- |
| .error      | Registers an error log. |

### **Quirk**

An extension to the speech module that can add a speech quirk to the messages before being sent.

| Method Name | Functionality                                      |
| ----------- | -------------------------------------------------- |
| .get        | Transforms text by a random speech quirk.          |
| .try        | Same as `.get` but with a 50% chance of happening. |

### **Schedule**

Uses [Cron](https://github.com/kelektiv/node-cron#readme) to schedule jobs to be done when the time comes.

| Method Name        | Functionality                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------- |
| .generateTimestamp | Returns a [Cron string](https://crontab.guru/) for a random minute, hour and day of the week. |
| .run               | Schedules a job to be run systematically.                                                     |
| .runOnce           | Schedules a job to be run once.                                                               |

### **Time**

Deals with time using [Moment](https://momentjs.com/).

| Method Name | Functionality                           |
| ----------- | --------------------------------------- |
| .get        | Returns a string with the current date. |

### **Word**

Manipulates strings.

| Method Name     | Functionality                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| .append         | Adds a suffix to a string.                                                                                                              |
| .replaceAll     | Beefed up version of [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). |
| .replaceAllCase | Beefed up version of `.replaceAll`.                                                                                                     |
| .replaceLast    | Replaces the last instance of a value within a string                                                                                   |
| .startsWithAny  | Checks if a string starts with a certain value                                                                                          |

## **Quote**

Every Sunday at midnight, it chooses a random week day and a random time to send a quote from a list it gets from the database.

---

## **Reminder**

Every day at noon, it calls the database to check for new reminders. If there are any new ones, it starts a job to send an embed with the reminder at the stipulated time.  
Reminders can be of three types:

-   Birthday: Self explanatory.
-   Celebration: A special date to be celebrated.
-   Release: The release date for a game or movie.

---

## **Speech**

Every time a message is sent in the guild, it will scan it and choose an action to take.

### **Greeting**

If the message contains a mention to Artemis and it has yet to respond with something else, it will reply with a random greeting.

### **Prediction**

If the message ends with a question mark and Artemis was mentioned it will reply with an [Magic 8 Ball](https://magic-8ball.com/) style response. If it wasn't mentioned, there is still a one in three chance it will respond.

### **Reaction**

If the message contains a certain trigger word from a stored list, there is a one in three chance it will react to the message.

### **Response**

If the message contains a certain trigger word from a stored list, there is a one in three chance it will respond to the message, but only if it hasn't sent a prediction before.

---

## **Story**

Every Sunday at midnight, it chooses a random week day and a random time to send a randomly generated story with a randomly selected member as the protagonist.
