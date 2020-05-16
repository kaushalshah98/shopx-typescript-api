import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getProduct(productId: string): Promise<any> {
    try {
      const result = await this.repository.getProduct(productId);
      if (result && result.length > 0) {
        const product = result.map((data: any) => data.product);
        return product[0] as IProductItem;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
