import { CreateEmailResponse, Resend } from "resend";

type TEmailParams = {
  from?: string;
  to: string;
  subject: string;
  html: string;
};

export class ResendService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail({
    from,
    to,
    subject,
    html,
  }: TEmailParams): Promise<CreateEmailResponse> {
    try {
      const data = await this.resend.emails.send({
        from: from ?? "noreplay@dejongyeong.com",
        to: to,
        subject: subject,
        html: html,
      });
      return data;
    } catch (error) {
      throw new Error("Error sending email: ", error);
    }
  }
}
