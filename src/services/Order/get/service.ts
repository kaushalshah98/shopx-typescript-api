import { CouchbaseError } from 'couchbase';
import { IOrder } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getAllOrders(): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getAllOrders()
            .then((result: any) => {
              if (result && result.length > 0) {
                const orders = result.map((data: any) => data.orders);
                resolve(orders as IOrder[]);
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
