import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync, mkdirSync, stat } from 'fs';
import { resolve } from 'path';
import inquirer from 'inquirer';
import read from 'fs-readdir-recursive';
import { questions, PROJECT_TYPES } from './questions.js';

const INVALID_TEMPLATE_FILES_PATTERNS = ['.log', '.DS_Store', 'node_modules'];
const REPLACE_PATTERNS = [{ pattern: '__PROJECT_NAME__', answerKey: 'projectName' }];

console.log('Hi, welcome to generate-project ');

// helper to create project path relative to monorepo root
function getProjectPath(projectType, projectName) {
  let folderName = '';
  if (projectType === PROJECT_TYPES.application) {
    folderName = 'apps';
  } else if (projectType === PROJECT_TYPES.package) {
    folderName = 'packages';
  }

  return resolve(process.cwd(), `./${folderName}/${projectName}`);
}

// helper to create project dir
function createDir(path) {
  if (existsSync(path)) {
    throw new Error(`Folder already exists at: ${path}`);
  }
  mkdirSync(path);
}

// read and filter template files
function readTemplateFiles(templatePath) {
  const templateFiles = read(templatePath, (name) => {
    if (name[0] === '.') return false;

    for (const pattern of INVALID_TEMPLATE_FILES_PATTERNS) {
      if (name.includes(pattern)) return false;
    }

    return true;
  });

  return templateFiles.filter((fileName) => {
    for (const pattern of INVALID_TEMPLATE_FILES_PATTERNS) {
      if (fileName.includes(pattern)) return false;
    }

    return true;
  });
}

function createSubFolders(projectPath, templateFiles) {
  const nestedFiles = templateFiles.filter((path) => path.includes('/'));
  const folderPaths = {};
  for (const f of nestedFiles) {
    const parts = f.split('/');
    const folderPath = parts.slice(0, parts.length - 1).join('/');
    folderPaths[folderPath] = true;
  }

  for (const path of Object.keys(folderPaths)) {
    createDir(resolve(projectPath, `./${path}`));
  }
}

inquirer
  .prompt(questions)
  .then(async (answers) => {
    const { projectType, projectName } = answers;

    try {
      // set up new project directory
      const projectPath = getProjectPath(projectType, projectName);
      createDir(projectPath);

      // read template files
      const templatePath = new URL(`templates/template-${projectType}`, import.meta.url).pathname;
      const templateFiles = readTemplateFiles(templatePath);

      // create any subfolders needed in new project directory
      createSubFolders(projectPath, templateFiles);

      // process each template file
      for (const fileName of templateFiles) {
        const contents = await readFile(`${templatePath}/${fileName}`);
        let contentsAsString = contents.toString();

        // replace template strings in template files with project related data
        for (const replaceEntry of REPLACE_PATTERNS) {
          if (contentsAsString.includes(replaceEntry.pattern)) {
            const re = new RegExp(replaceEntry.pattern, 'g');
            contentsAsString = contentsAsString.replace(re, answers[replaceEntry.answerKey]);
          }
        }

        // write file to new project directory
        const targetPath = resolve(projectPath, `./${fileName}`);
        await writeFile(targetPath, contentsAsString);
      }

      console.log('Success! Please run `yarn` in the project root.');
    } catch (err) {
      console.error(`Could not create project: ${err}`);
    }
  })
  .catch((error) => {
    console.log(error);
  });
