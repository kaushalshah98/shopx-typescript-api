import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async createProduct(productdata: IProductItem): Promise<any> {
    try {
      const result = await this.repository.createProduct(productdata);
      if (result.length <= 0) {
        return Promise.resolve(null);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
