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

  public async Authenticate(): Promise<any> {
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        resolve(
          this.cluster.authenticate(this.connection.COUCHBASE_USER, this.connection.COUCHBASE_PWD)
        );
      }
    );
  }
  public async getBucket(bucketName: string): Promise<any> {
    return new Promise(
      (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
        const bucket: IBucket = this.cluster.openBucket(bucketName, (err: CouchbaseError) => {
          if (err) {
            reject(err);
          } else {
            resolve(bucket);
          }
        });
      }
    );
  }
}
