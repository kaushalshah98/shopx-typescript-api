import { ApiHandler } from 'shared/api.interfaces';
import { Connection } from '../../../../config/connection';
import { DBBucket } from '../../../../config/DbBucket';
import { Controller } from './controller';
import { Repository } from './repository';
import { Service } from './service';

const conn: Connection = new Connection();
const bucket: DBBucket = new DBBucket(conn);

const repo: Repository = new Repository(bucket);
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

export const getProduct :ApiHandler = controller.getProduct;
