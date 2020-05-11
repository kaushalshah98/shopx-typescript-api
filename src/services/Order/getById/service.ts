import { CouchbaseError } from 'couchbase';
import { IOrder } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getUserOrder(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getUserOrder(userId)
            .then((result: any) => {
              if (result && result.length > 0) {
                resolve(result[0].orders as IOrder);
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
