import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async updateCart(userId: string, quantity: number, productId: string): Promise<any> {
    try {
      const result = await this.repository.updateCart(userId, quantity, productId);
      if (result) {
        return Promise.resolve(result.value);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
