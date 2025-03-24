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
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { Publication } from "./entities/publication.entity";
import { PublicationsService } from "./publications.service";

@Controller({ path: "publications", version: "1" })
@ApiTags("Publications")
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: Publication,
    description: "Create a new publication",
  })
  async create(
    @Body(new ValidationPipe()) createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Publication],
    description: "Get all publications",
  })
  async findAll() {
    return this.publicationsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    type: Publication,
    description: "Get publication by ID",
  })
  async findOne(
    @Param("id", ParseUUIDPipe)
    id: string,
  ) {
    const publication = await this.publicationsService.findOne(id);

    if (!publication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }
    return publication;
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Publication,
    description: "Update publication by ID",
  })
  async update(
    @Param("id", ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe()) updatePublicationDto: UpdatePublicationDto,
  ) {
    // record not found handle by PrismaClientExceptionFilter
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Publication,
    description: "Delete publication by ID",
  })
  async remove(
    @Param("id", ParseUUIDPipe)
    id: string,
  ) {
    // record not found handle by PrismaClientExceptionFilter
    return this.publicationsService.remove(id);
  }
}
