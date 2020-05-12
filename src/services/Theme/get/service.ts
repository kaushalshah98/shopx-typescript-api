import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getTheme(userId: string): Promise<any> {
    try {
      const result = await this.repository.getTheme(userId);
      if (result) {
        return result[0];
      }return result;
    } catch (error) {
      throw error;
    }
  }
}
