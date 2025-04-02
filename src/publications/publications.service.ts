import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // use prisma to get all publications with pagination
    const [data, total] = await Promise.all([
      this.prisma.publication.findMany({
        skip,
        take: limit,
        orderBy: { publishedAt: "desc" },
      }),
      this.prisma.publication.count(), // total count
    ]);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: string) {
    return this.prisma.publication.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }
}
