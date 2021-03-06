# Official Discord Bot from Code Force

`CodeForce Discord Bot` is (who could have guessed it) a discord bot with miscellaneous quality of life commands (music, polls, ...) to improve the overall server experience.

[![Discord](https://img.shields.io/discord/308323056592486420?logo=discord)](https://discord.gg/E72mnpj) [![GitHub license](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/DevTobias/code-force-discord-bot/blob/main/LICENSE)



## Table of content

* [Features](#features)
* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Common errors](#common-errors)
* [License](#License)



## Features

| Music features |
|:---------------------------------------------------------------|
|  Play YouTube music (link, query or playlist) |
| Stop, Skip, Pause and Resume playing songs |
| Shuffle playlist |

| Voting features |
|:---------------------------------------------------------------|
| Create and evaluate polls |
| Poll visualisation |

| Ranking system |
|:---------------------------------------------------------------|
| Gather experience for being active |
| Level up to collect goodies |

| Quality of Life |
|:---------------------------------------------------------------|
| Clear last chat messages |
| Get User information |



## Requirements

- [ ] [Node](https://nodejs.org/en/)
- [ ] [NPM](https://www.npmjs.com/)
- [ ] [FFMPEG](https://www.ffmpeg.org/)



## Getting started

First of all make sure you install **all** the above **listed requirements** on your local system. After you installed everything, follow the upcoming installation steps.

### Installation

```bash
# Clone this git repository
git clone https://github.com/DevTobias/code-force-discord-bot.git

# Move to the project root directory
cd code-force-discord-bot

# Install the dependencies with npm package manager
npm install
```

Now everything should be installed and is ready to start.

### Necessary adjustments

Because of security reasons, the '.env' and 'config.json' files are **missing**. The '.env' contains the needed Google/YouTube API Token and 'config.json' the Discord API token. 

For the application to work, you have to add both files and add following code to it (note: You can also change the command prefix if you want to):

#### config.json
```json
{
    "prefix": "$",
    "token": "DISCORD-API-TOKEN"
}
```

#### .env
```
GOOGLE_AUTH=GOOGLE-API-TOKEN
```

### Starting the application
Test live server with nodemon:
```bash
npm test
```
Static server with node:
```bash
npm start
```



## License

The CodeFoce Discord Bot is available under the MIT license, see the [LICENSE](https://github.com/DevTobias/code-force-discord-bot/blob/main/LICENSE) file for more information.