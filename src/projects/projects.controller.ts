import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

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
  @ApiCreatedResponse({ type: Project, description: "Create a new project" })
  async create(@Body(new ValidationPipe()) createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({ type: [Project], description: "Get all projects" })
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: Project, description: "Get project by ID" })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: Project, description: "Update project by ID" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: Project, description: "Delete project by ID" })
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
