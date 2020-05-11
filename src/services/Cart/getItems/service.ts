import { CouchbaseError } from 'couchbase';
import { ICart } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getItems(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getItems(userId)
            .then((result: any) => {
              if (result && result.length > 0) {
                const cartitems = result.map((data: any) => data.cartitems);
                resolve(cartitems as ICart[]);
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
