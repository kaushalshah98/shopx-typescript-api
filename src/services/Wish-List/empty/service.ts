import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async clearWishList(userId: string): Promise<any> {
    try {
      return this.repository.clearWishList(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
