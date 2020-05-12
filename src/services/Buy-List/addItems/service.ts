import { IBuyList, IListArray } from '../../../../shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async AddItems(userId: string, list: IListArray[]): Promise<any> {
    try {
      const listdoc: IBuyList = {
        list,
        userid: userId,
        type: 'BUYLIST'
      };
      return await this.repository.AddItems(userId, listdoc);
    } catch (error) {
      throw error;
    }
  }
}
