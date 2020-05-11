import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async removeItem(userId: string, productId: string): Promise<any> {
    try {
      return this.repository.removeItem(userId, productId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
