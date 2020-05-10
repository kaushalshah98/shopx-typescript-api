import { IUser } from 'shared/model';
import { SendMail } from '../../../shared/sharedfunctions';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository, private sendmail: SendMail) {}
  public async createUser(userdata: IUser): Promise<any> {
    try {
      const result = await this.repository.createUser(userdata);
      if (result.length <= 0) {
        return Promise.resolve(null);
      }
      const receiver = userdata.email;
      const message = `Helllo ${userdata.name}`;
      const subject = 'Welcome To Shopx';
      return this.sendmail.sendmail(receiver, subject, message, (err: Error | null, res: any) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
