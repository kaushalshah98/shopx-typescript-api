import { IUser } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getUser(userId: string): Promise<any> {
    try {
      const result = await this.repository.getUser(userId);
      if (result && result.length > 0) {
        const user = result.map((data: any) => data.user);
        return user[0] as IUser;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
