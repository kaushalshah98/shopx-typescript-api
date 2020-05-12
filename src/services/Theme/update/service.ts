import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async updateTheme(userId: string, theme: string): Promise<any> {
    try {
      return await this.repository.updateTheme(userId, theme);
    } catch (error) {
      throw error;
    }
  }
}
