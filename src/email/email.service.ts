import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ResendService } from "./resend/resend.service";

@Injectable()
export class EmailService {
  constructor(
    private readonly resendService: ResendService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPasswordEmail(email: string, token: string) {
    const payload = { email };

    const url = this.configService.getOrThrow<string>("app.frontendUrl");
    const link = `${url}/reset-password?token=${token}`;

    const sent = await this.resendService.sendEmail({
      from: "noreply@dejongyeong.com",
      to: payload.email,
      subject: "Reset your password",
      html: `
        <div>
          <p>Password reset link, ${link}</p>
        </div>
      `,
    });

    const { data, error } = sent;
    if (!data || error) {
      throw new InternalServerErrorException("Failed to send email");
    }

    return data.id;
  }
}
