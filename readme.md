<h1 align="center">
  Artemis20<br>
  <img src="https://cdn.discordapp.com/app-icons/698208086116007937/059fb0a99a712a052960d4bb5907576c.png" /><br>
</h1>

<p align="center">An all purpose Discord bot</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/JohnnyOak85/oak-server.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/JohnnyOak85/oak-server.svg">

  <a href="https://github.com/JohnnyOak85/oak-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/JohnnyOak85/oak-server.svg">
  </a>

 <a href="https://www.codacy.com/gh/JohnnyOak85/artemis/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JohnnyOak85/artemis&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy Badge" src="https://app.codacy.com/project/badge/Grade/1f8f3376b5a648e48b446f547a3063ba" />
 </a>
</p>

## Table of Contents

-   [Introduction](#introduction)
-   [Modules](#modules)
    -   [Game (Tales of Murwelgrave)](#game-tales-of-murwelgrave)
    -   [Moderation](#moderation)
    -   [Quote](#quote)
    -   [Reminder](#reminder)
    -   [Speech](#speech)
    -   [Story](#story)

## Introduction

Artemis is my all purpose bot with various modules. It was born from parts of other bots.  
The first bot I created was [ToriBot](https://github.com/JohnnyOak85/DiscordBot) which started as a moderation bot but then expanded to have more functionalities.  
I then had the idea for a Discord based game, but since ToriBot was getting old and cluttered, I decided to create [Tales of Murwelgrave](https://github.com/JohnnyOak85/Tales-of-Murwelgrave). It worked fairly well for an Halloween season during the month of October 2022.  
Eventually I decided to create Artemis as a speech bot and [Warden](https://github.com/JohnnyOak85/Warden) as a moderation bot, but since I don't have much need for a moderation bot, I decided to retire Warden.  
Since then, I've been refactoring Artemis to use modular microservices, thus the need for multiple bots stopped making sense. So Artemis ended up absorbing the functionalities of all previous bots (including Warden, just in case).  
More modules will be added and I'd like to dabble into GTP3 so that Artemis can have a brain.

## Modules

### Game (Tales of Murwelgrave)

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
