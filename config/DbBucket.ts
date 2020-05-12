import { CouchbaseError, N1qlQuery } from 'couchbase';
import { CONSTANT } from '../shared/constant';
import { Connection } from './connection';

const KEY_VALUE_OPERATION_TIMEOUT = 3000;

export class DBBucket {
  constructor(private readonly _connection: Connection) {
    this.Authenticate();
  }
  private bucket: any;
  private niql: typeof N1qlQuery = this._connection.niql;
  private bucketName: string = CONSTANT.BUCKET_NAME;
  private async Authenticate(): Promise<void> {
    await this._connection.Authenticate();
  }
  private async getBucket(bucketName: string): Promise<any> {
    try {
      return await this._connection.getBucket(bucketName);
    } catch (error) {
      console.error(`[DBBucket] Connection failed for ${bucketName} Bucket!`);
      console.log(error);
    }
  }
  public async insert(id: string, object: object, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    const result = await new Promise((resolve: any, reject: any) => {
      options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
      this.bucket.insert(id, object, options, (err: CouchbaseError | null, row: any[] | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  }
  public async query(queryString: string, parameters?: any, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    const query: N1qlQuery = this.niql.fromString(queryString);
    const result = await new Promise((resolve: any, reject: any) => {
      options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
      this.bucket.query(query, parameters, (err: CouchbaseError | null, row: any[] | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  }
  public async upsert(id: string, object: object, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
    const result = await new Promise((resolve: any, reject: any) => {
      options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
      this.bucket.upsert(id, object, options, (err: CouchbaseError | null, row: any[] | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  }
  public async remove(id: string, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    const result = await new Promise((resolve: any, reject: any) => {
      options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
      this.bucket.remove(id, options, (err: CouchbaseError | null, row: any[] | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  }
  public async get(id: string, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    const result = await new Promise((resolve: any, reject: any) => {
      options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
      this.bucket.get(id, options, (err: CouchbaseError | null, row: any[] | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  }
}
