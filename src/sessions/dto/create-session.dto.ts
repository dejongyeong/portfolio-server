import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateSessionDto {
  @IsString()
  userId: string;

  @IsString()
  token: string;

  @IsDate()
  @Type(() => Date)
  expiresAt: Date;
}
