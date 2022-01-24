export const PROJECT_TYPES = {
  application: 'app',
  package: 'package',
};

function toLowerCase(val) {
  return val.toLowerCase();
}

export const questions = [
  {
    type: 'list',
    name: 'projectType',
    message: 'What do you want to generate?',
    choices: [
      { name: 'Application', value: PROJECT_TYPES.application },
      { name: 'Package', value: PROJECT_TYPES.package },
    ],
    filter: toLowerCase,
  },
  {
    type: 'input',
    name: 'projectName',
    message: "What's the name of the project?",
    validate(val) {
      return (val && val.length > 0) || 'Please enter a name';
    },
    filter: toLowerCase,
  },
];
