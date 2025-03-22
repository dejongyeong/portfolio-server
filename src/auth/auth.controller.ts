import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ValidationPipe } from "../common/pipe/validation.pipe";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entities/auth.entity";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({
    type: AuthEntity,
    description: "User login with email and password",
  })
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const user = await this.authService.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  // delete cookie on frontend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logout(@Request() _req: any) {
    return { message: "Logout successfully" };
  }
}
