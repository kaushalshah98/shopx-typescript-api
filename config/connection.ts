import { CouchbaseError } from 'couchbase';
import couchbase from 'couchbase';
import { IBucket, IConnectionObject } from '../shared/api.interfaces';

export class Connection {
  private connection: IConnectionObject = {
    COUCHBASE_URL: 'couchbase://localhost:8091',
    COUCHBASE_USER: 'Administrator',
    COUCHBASE_PWD: 'couchbase'
  };
  private cluster: couchbase.Cluster = new couchbase.Cluster(this.connection.COUCHBASE_URL);

  public niql: typeof couchbase.N1qlQuery = couchbase.N1qlQuery;

  public async Authenticate(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      resolve(
        this.cluster.authenticate(this.connection.COUCHBASE_USER, this.connection.COUCHBASE_PWD)
      );
    });
  }
  public async getBucket(bucketName: string): Promise<any> {
    const bucketInstance = await new Promise((resolve: any, reject: any) => {
      const bucket: IBucket = this.cluster.openBucket(bucketName, (err: CouchbaseError) => {
        if (err) {
          reject(err);
        } else {
          resolve(bucket);
        }
      });
    });
    return bucketInstance;
  }
}
