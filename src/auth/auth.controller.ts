import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { AuthEntity } from "./entities/auth.entity";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({
    type: AuthEntity,
    description: "User login with email and password",
  })
  async login(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  // delete cookie on frontend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logout(@Request() _req: any) {
    return { message: "Logout successfully" };
  }
}
