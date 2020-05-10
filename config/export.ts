import bodyParser from 'body-parser';
import cors from 'cors';
import couchbase from 'couchbase';
import dateformat from 'dateformat';
import express from 'express';
import nodemailer from 'nodemailer';
import { CONSTANT } from '../src/shared/constant';

const app = express();
const niql = couchbase.N1qlQuery;
const portNumber = CONSTANT.PORT_NUMBER;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Exporting the necessary variables
export { app, niql, nodemailer, portNumber, dateformat };
