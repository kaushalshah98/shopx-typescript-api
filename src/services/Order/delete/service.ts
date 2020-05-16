import { IOrder, IOrderArray } from '@shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async deleteOrder(userId: string, orders: IOrderArray[][]): Promise<any> {
    try {
      const orderdoc: IOrder = {
        orders,
        userid: userId,
        type: 'ORDER'
      };
      return this.repository.deleteOrder(userId, orderdoc);
    } catch (error) {
      throw error;
    }
  }
}
