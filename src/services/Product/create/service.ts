import { IProductItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async createProduct(productdata: IProductItem): Promise<any> {
    try {
      return await this.repository.createProduct(productdata);
    } catch (error) {
      throw error;
    }
  }
}
