import { IUser } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async updateUser(userId: string, userdata: IUser): Promise<any> {
    try {
      const result = await this.repository.updateUser(userId, userdata);
      if (result) {
        return Promise.resolve(result.value);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
