#!/usr/bin/env node

import fs from 'fs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import inquirer from 'inquirer';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

const gamesDirectory = path.join(__dirname, '../src/games');
const playDirectory = path.join(__dirname, '../src/routes/play');

const generateUniqueGamePath = (baseName) => {
    let gameName = _.kebabCase(baseName);
    let gamePath = path.join(gamesDirectory, gameName);
    while (fs.existsSync(gamePath)) {
        const uniqueSuffix = uuidv4().slice(0, 4);
        gameName = `${gameName}-${uniqueSuffix}`;
        gamePath = path.join(gamesDirectory, gameName);
    }
    return gamePath;
};

const createGame = async (gameName, authorName, authorUrl, authorEmail) => {
    const gamePath = generateUniqueGamePath(gameName);

    await copyDirectory(path.join(__dirname, '../templates/game'), gamePath);

    await renameFilesAndContent(gamePath, 'Name', _.upperFirst(_.camelCase(gameName)));

    const configPath = path.join(gamePath, 'config.json');
    let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    config.id = uuidv4();
    config.slug = gamePath.split('/').pop();
    config.author = {
        name: authorName, url: authorUrl, email: authorEmail
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    await createGameComponent(gamePath, 'exampleComponent');

    console.log(`Game "${gameName}" created at ${gamePath} by ${authorName} (URL: ${authorUrl}, Email: ${authorEmail})`);
};

const createComponent = async (componentName) => {
    const componentsDirectory = path.join(__dirname, '../src/components/shared');
    const componentPath = path.join(componentsDirectory, componentName);

    await copyDirectory(path.join(__dirname, '../templates/component'), componentPath);
    await renameFilesAndContent(componentPath, 'Name', _.upperFirst(_.camelCase(componentName)));

    console.log(`Component "${componentName}" created at ${componentPath}`);
};

const createGameComponent = async (gamePath, componentName) => {
    const componentsPath = path.join(gamePath, 'components');
    const componentPath = path.join(componentsPath, componentName);

    await copyDirectory(path.join(__dirname, '../templates/component'), componentPath);
    await renameFilesAndContent(componentPath, 'Name', _.upperFirst(_.camelCase(componentName)));

    console.log(`Game Component "${componentName}" created in ${componentPath}`);
};

const deleteGame = async (id) => {
    const games = fs.readdirSync(gamesDirectory);

    for (const gameDir of games) {
        const configPath = path.join(gamesDirectory, gameDir, 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            if (config.id === id) {
                fs.rm(path.join(gamesDirectory, gameDir), {recursive: true});
                console.log(`Game with ID ${id} has been deleted.`);
                return;
            }
        }
    }

    console.log(`No game found with ID ${id}`);
};

const copyDirectory = async (src, dest) => {
    fs.mkdirSync(dest, {recursive: true});
    const entries = fs.readdirSync(src, {withFileTypes: true});

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

const renameFilesAndContent = async (dir, originalName, newName) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        if (filePath.endsWith('.tsx') || filePath.endsWith('.sass')) {
            let updatedContent = fs.readFileSync(filePath, 'utf-8');
            updatedContent = updatedContent.replace(new RegExp(originalName, 'g'), newName);
            updatedContent = updatedContent.replace(new RegExp(originalName.toLowerCase(), 'g'), _.kebabCase(newName));
            fs.writeFileSync(filePath, updatedContent);

            let newFileName = file;
            newFileName = newFileName.replace(originalName, newName);
            newFileName = newFileName.replace(originalName.toLowerCase(), _.kebabCase(newName));
            const newFilePath = path.join(dir, newFileName);

            fs.renameSync(filePath, newFilePath);
        }
    }
};

// Utilisation de yargs pour analyser les arguments
const argv = yargs(hideBin(process.argv)).argv;

const command = argv._[0];
const args = argv._.slice(1);

if (command === 'create-game') {
    if (args.length === 0) {
        console.log('Error: Please provide a game name.');
    } else {
        const gameName = args.join(' ');
        inquirer.prompt([{
            type: 'input',
            name: 'authorName',
            message: 'Enter the author\'s name (or username):',
            validate: (input) => input ? true : 'Name is required',
        }, {
            type: 'input', name: 'authorUrl', message: 'Enter the author\'s profile URL (e.g., GitHub URL) (optional):',
        }, {
            type: 'input', name: 'authorEmail', message: 'Enter a contact email (optional):',
        },]).then(async answers => {
            await createGame(gameName, answers.authorName, answers.authorUrl, answers.authorEmail);
        });
    }
} else if (command === 'create-component') {
    if (args.length < 1) {
        console.log('Error: Please provide a component name.');
    } else {
        const componentName = args.join(' ');
        createComponent(componentName);
    }
} else if (command === 'create-game-component') {
    if (args.length < 2) {
        console.log('Error: Please provide a game name and a component name.');
    } else {
        const gameName = args[0];
        const componentName = args.slice(1).join(' ');
        createGameComponent(gameName, componentName);
    }
} else if (command === 'update') {
    // ......
} else if (command === 'delete') {
    if (args.length < 1) {
        console.log('Error: Please provide a game ID.');
    } else {
        deleteGame(args[0]);
    }
} else {
    console.log('Unknown command. Available commands: create-game, create-component, create-game-component, update-game, delete');
}
