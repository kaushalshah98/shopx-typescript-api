import dateformat from 'dateformat';
import { IOrder, IOrderArray } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async createOrder(userId: string, order: IOrderArray[]): Promise<any> {
    try {
      const now: Date = new Date();
      order.forEach(
        (item: IOrderArray) => (item.date = dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT'))
      );
      const orderdoc: IOrder = {
        order,
        userid: userId,
        type: 'ORDER'
      };
      const result = await this.repository.checkOrder(userId);
      if (result.length <= 0) {
        return await this.repository.createOrder(userId, orderdoc);
      } else {
        return await this.repository.updateOrder(userId, order);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
