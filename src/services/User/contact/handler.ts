import { ApiHandler } from 'shared/api.interfaces';
import { SendMail } from '../../../shared/sharedfunctions';
import { Controller } from './controller';
import { Service } from './service';

const sendmail: SendMail = new SendMail();

const service: Service = new Service(sendmail);
const controller: Controller = new Controller(service);

export const contactUs: ApiHandler = controller.contactUs;
