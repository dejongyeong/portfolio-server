import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { Request } from "express";

import { PrismaService } from "../common/prisma/prisma.service";
import { CreateSessionDto } from "./dto/create-session.dto";

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  findOne(uid: string) {
    return this.prisma.session.findFirst({
      where: {
        userId: uid,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });
  }

  create(createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({
      data: createSessionDto,
    });
  }

  revokeAllSessions(uid: string) {
    return this.prisma.session.updateMany({
      where: {
        userId: uid,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  /**
   * Validate refresh token
   *
   * @token unhashed token
   */
  async validateRefreshToken(uid: string, req: Request) {
    const token = req.cookies?.refresh_token as string | undefined;
    if (!token) {
      throw new ForbiddenException("Refresh token not found");
    }

    // get the session from the database based on uid
    const session = await this.prisma.session.findFirst({
      where: {
        userId: uid,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      throw new NotFoundException("User session not found");
    }

    // compare the token with the hashed token in the database
    const isTokenValid = await bcrypt.compare(token, session.token);
    if (!isTokenValid) {
      throw new ForbiddenException("Invalid refresh token");
    }

    return token; // unhashed token
  }
}
