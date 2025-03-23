import { PartialType } from "@nestjs/swagger";

import { CreateSessionDto } from "./create-session.dto";

export class UpdatePublicationDto extends PartialType(CreateSessionDto) {}
