import { SendMail } from '../../../shared/sharedfunctions';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository, private sendmail: SendMail) {}
  public async forgotPassword(username: string, email: string): Promise<any> {
    try {
      const result = await this.repository.forgotPassword(username, email);
      if (result.length <= 0) {
        return Promise.resolve(null);
      }
      const receiver = email;
      const message = `Your Password is ${result[0].password}`;
      const subject = `Hello ${username}`;
      return this.sendmail.sendmail(receiver, subject, message, (err: Error | null, res: any) => {
        if (err) { throw err; }
      });
    } catch (error) {
      throw error;
    }
  }
}
