import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async deleteProduct(productId: string): Promise<any> {
    try {
      return this.repository.deleteProduct(productId);
    } catch (error) {
      throw error;
    }
  }
}
