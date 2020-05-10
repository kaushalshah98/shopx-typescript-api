import { CouchbaseError } from 'couchbase';
import { IUser } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getUser(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getUser(userId)
            .then((result: any) => {
              if (result && result.length > 0) {
                const user = result.map((data: any) => data.user);
                resolve(user[0] as IUser);
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
