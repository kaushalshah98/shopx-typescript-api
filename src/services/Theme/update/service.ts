import { CouchbaseError } from 'couchbase';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async updateTheme(userId: string, theme: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .updateTheme(userId, theme)
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
