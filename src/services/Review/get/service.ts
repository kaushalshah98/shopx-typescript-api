import { CouchbaseError } from 'couchbase';
import { IReview } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getReviews(productId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getReviews(productId)
            .then((result: any) => {
              if (result) {
                resolve(result[0].list as IReview[]);
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
