import bodyParser from 'body-parser';
import cors from 'cors';
import dateformat from 'dateformat';
import express from 'express';
import { CONSTANT } from '../shared/constant';

const app = express();
const portNumber = CONSTANT.PORT_NUMBER;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Exporting the necessary variables
export { app, portNumber, dateformat };
