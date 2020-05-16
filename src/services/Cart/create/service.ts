import { ICartArray, ICartItem } from '@shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async addItems(userId: string, productId: string): Promise<any> {
    try {
      const cartdoc: ICartItem = {
        cartitems: [{ product_id: productId, qty: 1 }],
        userid: userId,
        type: 'CART'
      };
      const result = await this.repository.checkCart(userId);
      if (result.length > 0) {
        const row = await this.repository.getQuantity(userId, productId);
        if (row.length <= 0) {
          const item: ICartArray = { product_id: productId, qty: 1 };
          return await this.repository.updateCart(userId, item);
        } else {
          const quantity: number = ++row[0].qty;
          console.log(quantity);
          return await this.repository.updateItem(quantity, userId, productId);
        }
      } else {
        return await this.repository.createCart(userId, cartdoc);
      }
    } catch (error) {
      throw error;
    }
  }
}
