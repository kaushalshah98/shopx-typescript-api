import { IUser } from 'src/shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getAllUsers(): Promise<any> {
    try {
      const result = await this.repository.getAllUsers();
      if (result) {
        const users = result.map((data: any) => data.users);
        return users as IUser[];
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
