import { ICartSize } from '@shared/model';
import { CouchbaseError } from 'couchbase';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getSize(userId: string): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          await this.repository
            .getSize(userId)
            .then((result: any) => {
              if (result && result.length > 0) {
                const cartsize = result.reduce((data: any) => data[0].cartsize);
                resolve(cartsize as ICartSize);
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
