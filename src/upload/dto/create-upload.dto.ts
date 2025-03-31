import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
}
