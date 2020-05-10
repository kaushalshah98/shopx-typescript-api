import { CouchbaseError } from 'couchbase';
import { IUser } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async Login(username: string, password: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .Login(username, password)
            .then((result: any) => {
              if (result && result.length > 0) {
                const user: IUser = result.map((data: any) => data.user);
                resolve(user[0]);
              } else {
                resolve(result);
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
