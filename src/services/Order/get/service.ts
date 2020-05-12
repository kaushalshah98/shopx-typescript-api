import { IOrder } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getAllOrders(): Promise<any> {
    try {
      const result = await this.repository.getAllOrders();
      if (result && result.length > 0) {
        const orders = result.map((data: any) => data.orders);
        return orders as IOrder[];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
