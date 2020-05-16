import dateformat from 'dateformat';
import { IOrder, IOrderArray } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async createOrder(userId: string, orders: IOrderArray[]): Promise<any> {
    try {
      const now: Date = new Date();
      orders.forEach(
        (item: IOrderArray) => (item.date = dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT'))
      );
      const order = [];
      order.push(orders);
      const orderdoc: IOrder = {
        orders: order,
        userid: userId,
        type: 'ORDER'
      };
      const result = await this.repository.checkOrder(userId);
      if (result.length <= 0) {
        return await this.repository.createOrder(userId, orderdoc);
      } else {
        return await this.repository.updateOrder(userId, orders);
      }
    } catch (error) {
      throw error;
    }
  }
}
