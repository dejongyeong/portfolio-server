import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ValidationPipe } from "../common/pipe/validation.pipe";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectsService } from "./projects.service";

@Controller("projects")
@ApiTags("Projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Project, description: "Create a new project" })
  async create(@Body(new ValidationPipe()) createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({ type: [Project], description: "Get all projects" })
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get("featured")
  @ApiOkResponse({ type: [Project], description: "Get all featured projects" })
  async findFeatured() {
    return this.projectsService.getFeatured();
  }

  @Get(":id")
  @ApiOkResponse({ type: Project, description: "Get project by ID" })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findOne(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Project, description: "Update project by ID" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDto,
  ) {
    // record not found handle by PrismaClientExceptionFilter
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Project, description: "Delete project by ID" })
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    // record not found handle by PrismaClientExceptionFilter
    return this.projectsService.remove(id);
  }
}
