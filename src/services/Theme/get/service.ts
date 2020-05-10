import { CouchbaseError } from 'couchbase';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getTheme(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getTheme(userId)
            .then((result: any) => {
              if (result) {
                resolve(result[0]);
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
