import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { ValidationPipe } from "../common/pipe/validation.pipe";
import { UserEntity } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

type TRequestUser = {
  sub: string;
  user: Record<string, any>;
  iat: number;
  exp: number;
  token: string;
};

@Controller({ path: "auth", version: "1" })
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: "User login with email and password" })
  async login(
    @Req() req: { user: UserEntity },

    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(req.user);

    // set cookies
    this.setCookie(res, result.access_token, result.refresh_token);

    return { ...result };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: { user: { id: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.user.id);

    // delete cookie
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { message: "Logout successfully" };
  }

  @Public()
  @Post("forgot-password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body(new ValidationPipe()) { email }: { email: string },
  ) {
    return await this.authService.forgotPassword(email);
  }

  @Public()
  @Post("reset-password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(
    @Query("token") token: string,
    @Body(new ValidationPipe()) { password }: { password: string },
  ) {
    return await this.authService.resetPassword(token, password);
  }

  @Post("refresh-token")
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: { user: TRequestUser; cookies: Record<string, string> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const uid = req.user.sub;
    const refreshToken = req.cookies?.refresh_token;

    // refresh the token
    const tokens = await this.authService.refreshToken(uid, refreshToken);

    // set new cookies
    const { access_token, refresh_token } = tokens;
    this.setCookie(res, access_token, refresh_token);

    return { message: "Refresh token successfully" };
  }

  /**
   * Set cookie
   *
   */
  private setCookie(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>("app.env") === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("app.env") === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
  }
}
