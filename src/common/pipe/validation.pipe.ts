/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

interface ValidationErrorFormat {
  property: string;
  constraints: { [type: string]: string } | undefined;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Validation failed",
        errors: this.formatMessage(errors),
      });
    }

    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object, Date];

    return !types.includes(metatype);
  }

  private formatMessage(errors: ValidationError[]): ValidationErrorFormat[] {
    return errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));
  }
}
