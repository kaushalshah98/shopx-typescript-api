import { CouchbaseError, N1qlQuery } from 'couchbase';
import { CONSTANT } from '../shared/constant';
import { Connection } from './connection';

const KEY_VALUE_OPERATION_TIMEOUT = 10000;

export class DBBucket {
  private bucket: any;
  private niql: typeof N1qlQuery;
  private bucketName = CONSTANT.BUCKET_NAME;

  constructor(private readonly _connection: Connection) {
    this.niql = this._connection.niql;
    this.initialize();
  }
  private async initialize(): Promise<void> {
    await this._connection.Authenticate();
  }

  public async insert(id: string, object: object, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
        this.bucket.insert(id, object, options, (err: CouchbaseError | null, row: any[] | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    );
  }
  public async query(queryString: string, parameters?: any, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    const query: N1qlQuery = this.niql.fromString(queryString);
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
        this.bucket.query(query, parameters, (err: CouchbaseError | null, row: any[] | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    );
  }
  public async upsert(id: string, object: object, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
        this.bucket.upsert(id, object, options, (err: CouchbaseError | null, row: any[] | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    );
  }
  public async remove(id: string, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
        this.bucket.remove(id, options, (err: CouchbaseError | null, row: any[] | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    );
  }
  public async get(id: string, options: any = {}): Promise<any> {
    this.bucket = await this.getBucket(this.bucketName);
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        options.timeout = KEY_VALUE_OPERATION_TIMEOUT;
        this.bucket.get(id, options, (err: CouchbaseError | null, row: any[] | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    );
  }
  private async getBucket(bucketName: string): Promise<any> {
    try {
      return await this._connection.getBucket(bucketName);
    } catch (error) {
      console.error(`[DBBucket] Connection failed for ${bucketName} Bucket!`);
      console.log(error);
    }
  }
}
