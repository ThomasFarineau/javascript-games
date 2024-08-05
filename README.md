# Javascript Games

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/ThomasFarineau/javascript-games?label=version&sort=semver)
![GitHub stars](https://img.shields.io/github/stars/ThomasFarineau/javascript-games)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)

A collection of games written in JavaScript or TypeScript.

## How to Install Locally

1. Clone the repository: `git clone https://github.com/ThomasFarineau/javascript-games.git`
2. Install the dependencies: `yarn install`
3. Start the development server: `yarn start` or `npm run start`

## How to Contribute

1. Fork the repository.
2. Create a new branch (e.g., `feature/name-of-the-feature` or `game/name-of-the-game`).
```bash
git checkout -b feature/name-of-the-feature
```
or
```bash
git checkout -b game/name-of-the-gamei
```

Make sure all executable files are executable by running:
```bash
chmod +x ./bin/*
npm link 
```

### Adding a New Game

To create a new game, run the following command: 
```bash
jg create <nameOfTheGame>
```

This will create a new folder `src/games/nameOfTheGame` with the following structure:
```
nameOfTheGame (camelCase)
├── NameOfTheGame.ts (PascalCase)
├── NameOfTheGame.sass 
├── instructions.md
├── config.json
├── assets
│   └── nav.svg
├── i18n
│   ├── fr.json
│   └── en.json
└── components
    ├── ExampleComponent.ts
    └── ExampleComponent.sass
```

- `NameOfTheGame.ts`: Exports a class that extends the `Game` class.
- `NameOfTheGame.sass`: Contains the styles for the game.
- `instructions.md`: A markdown file displayed in the game's instructions modal and on the homepage.
- `components`: An optional folder for any components used by the game.
- `assets`: An optional folder for any assets used by the game, with a default `nav.svg` icon, please keep svg format for icon.
- `i18n`: Contains the translations for the game. Add a new file for each language you want to support. The file name should be the language code (e.g., `fr.json` for French). A game is available in the user's language if the translation is available. Otherwise, the game is displayed is not displayed in the list.
- `config.json`: Contains game information such as title, description, author, tags, and ID.

> [!WARNING]
> It is strongly discouraged to change the ID in the config file. If you need to change it, run command the below to recreate an ID.

```bash
jg reset <nameOfTheGame>
```

### Updating the Game List

To update the game list, run the following command:
```bash
jg update
```

This updates the `src/games/index.json` file with the list of games. It also refreshes the list in the navbar and on the homepage.

If the ID is updated, rerun the update command to refresh the list.

> [!CAUTION]
> Do not push the `index.json` file; it is included in `.gitignore` for a reason.

### Merge Request

When you are done with your feature, create a merge request to the `main` branch of the repository.
