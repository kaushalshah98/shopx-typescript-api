import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getAllProducts(): Promise<any> {
    try {
      const result = await this.repository.getAllProducts();
      if (result && result.length > 0) {
        const products = result.map((data: any) => data.product);
        return products as IProductItem[];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
