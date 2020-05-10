import { CouchbaseError } from 'couchbase';
import { IBuyList, IListArray } from 'src/shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async AddItems(userId: string, list: IListArray[]): Promise<any> {
    try {
      return new Promise(
        async (resolve: (value?: any | null) => void, reject: (error?: CouchbaseError) => void) => {
          const listdoc: IBuyList = {
            list,
            userid: userId,
            type: 'BUYLIST'
          };
          await this.repository
            .AddItems(userId, listdoc)
            .then((result: any) => {
              if (result) {
                resolve(result);
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
