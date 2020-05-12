import { ICartSize } from '@shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getSize(userId: string): Promise<any> {
    try {
      const result = await this.repository.getSize(userId);
      if (result && result.length > 0) {
        const cartsize = result.reduce((data: any) => data[0].cartsize);
        return cartsize as ICartSize;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
