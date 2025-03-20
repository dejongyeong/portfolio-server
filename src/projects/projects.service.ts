import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  getFeatured() {
    return this.prisma.project.findMany({
      where: { isFeatured: true },
    });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
