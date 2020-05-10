import { CouchbaseError } from 'couchbase';
import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getProduct(productId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getProduct(productId)
            .then((result: any) => {
              if (result && result.length > 0) {
                const product = result.map((data: any) => data.product);
                resolve(product[0] as IProductItem);
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
