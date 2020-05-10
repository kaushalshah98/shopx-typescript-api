import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async updateProduct(productId: string, productdata: IProductItem): Promise<any> {
    try {
      return this.repository.updateProduct(productId, productdata);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
