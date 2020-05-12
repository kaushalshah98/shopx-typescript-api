import { SendMail } from '../../../shared/sharedfunctions';

export class Service {
  constructor(private sendmail: SendMail) {}
  public async contactUs(data: any): Promise<any> {
    try {
      const subject: string = data.subject;
      const message: string = data.message;
      const receiver = 'shopx589@gmail.com';
      return this.sendmail.sendmail(receiver, subject, message, (err: Error | null, res: any) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
