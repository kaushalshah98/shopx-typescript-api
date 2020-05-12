import { IUser } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async Login(username: string, password: string): Promise<any> {
    try {
      const result = await this.repository.Login(username, password);
      if (result && result.length > 0) {
        const user: IUser = result.map((data: any) => data.user);
        return user[0];
      }return result;
    } catch (error) {
      throw error;
    }
  }
}
