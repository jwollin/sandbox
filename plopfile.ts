import type { NodePlopAPI } from 'plop';

module.exports = function (plop: NodePlopAPI) {
  plop.setHelper('capitalCase', (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  plop.setGenerator('routes', {
    description: 'Adding route endpoints with all configs',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name: ',
      },
      {
        type: 'confirm',
        name: 'public',
        default: false,
        message: 'Is your route public facing?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'apps/node/src/routes/{{name}}',
        templateFiles: 'plop_templates/routes/*.hbs',
        base: 'plop_templates/routes',
      },
    ],
  });

  plop.setGenerator('app', {
    description: 'Adding Next JS with all configs',
    prompts: [
      {
        type: 'input',
        name: 'HELLO',
        message: 'HELLO: ',
      },
      {
        type: 'confirm',
        name: 'public',
        default: false,
        message: 'Is your route public facing?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'apps/api/src/routes/{{name}}',
        templateFiles: 'plop_templates/routes/*.hbs',
        base: 'plop_templates/routes',
      },
    ],
  });
};
