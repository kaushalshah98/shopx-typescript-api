import { IOrder } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getUserOrder(userId: string): Promise<any> {
    try {
      const result = await this.repository.getUserOrder(userId);
      if (result && result.length > 0) {
        return result[0].orders as IOrder;
      }return result;
    } catch (error) {
      throw error;
    }
  }
}
