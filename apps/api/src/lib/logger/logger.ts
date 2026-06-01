import chalk from 'chalk';

export function logger(type: string, msg: string) {
  const { log, info, warn, error } = console;
  switch (type) {
    case 'INFO': {
      return info(`${chalk.blue('INFO:')} ${msg}`);
    }
    case 'WARN': {
      return warn(`${chalk.yellow('WARN:')} ${msg}`);
    }
    case 'ERROR': {
      return error(`${chalk.red('ERROR:')} ${msg}`);
    }
    default: {
      return log(msg);
    }
  }
}
