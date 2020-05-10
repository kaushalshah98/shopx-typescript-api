import { CouchbaseError } from 'couchbase';
import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getAllProducts(): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getAllProducts()
            .then((result: any) => {
              if (result && result.length > 0) {
                const products = result.map((data: any) => data.product);
                resolve(products as IProductItem[]);
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
