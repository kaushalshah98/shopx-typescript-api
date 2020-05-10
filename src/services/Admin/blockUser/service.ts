import { CouchbaseError } from 'couchbase';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async blockUser(userid: string, status: boolean): Promise<any> {
    try {
      return new Promise(
        async (
          resolve: (value?: any | null) => void,
          reject: (error?: CouchbaseError) => void
        ) => {
          await this.repository
            .blockUser(userid, status)
            .then((result: any) => {
              if (result) {
                resolve(result);
              } else {
                resolve(null);
              }
            })
            .catch((error: CouchbaseError) => {
              reject(error);
            });
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
