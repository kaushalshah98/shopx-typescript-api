import chalk from 'chalk';
import { app, portNumber } from '../config/export';

// Get All the routes
require('./routes');

console.log(chalk.blue('---------------------------------'));
console.log(chalk.greenBright(`              ^ ^         `));
console.log(chalk.greenBright(`               V          `));
console.log(chalk.blue('---------------------------------'));

// Server created on port :-  3000
app.listen(portNumber, () =>
  console.log(chalk.cyanBright(`Server is Running At Port ${portNumber}....`))
);
