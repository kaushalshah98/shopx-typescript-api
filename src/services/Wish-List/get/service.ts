import { CouchbaseError } from 'couchbase';
import { IWishItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getWishListItems(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getWishListItems(userId)
            .then((result: any) => {
              if (result && result.length > 0) {
                const wishlist = result.map((data: any) => data.wishlistitems);
                resolve(wishlist as IWishItem[]);
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
