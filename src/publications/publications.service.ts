import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  create(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  findAll() {
    return this.prisma.publication.findMany();
  }

  findOne(id: string) {
    return this.prisma.publication.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  remove(id: string) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }
}
