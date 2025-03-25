import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

import { PrismaService } from "../common/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findByResetPasswordToken(token: string) {
    return this.prisma.user.findFirst({
      where: { resetPasswordToken: token },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // hash password if it's provided
    if (updateUserDto.password) {
      const salt = bcrypt.genSaltSync(10);
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, salt);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
