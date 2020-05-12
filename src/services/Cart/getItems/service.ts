import { ICart } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getItems(userId: string): Promise<any> {
    try {
      const result = await this.repository.getItems(userId);
      if (result && result.length > 0) {
        const cartitems = result.map((data: any) => data.cartitems);
        return cartitems as ICart[];
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
