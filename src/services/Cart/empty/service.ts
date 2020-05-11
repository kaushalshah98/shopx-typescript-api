import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async clearCart(userId: string): Promise<any> {
    try {
      return this.repository.clearCart(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
