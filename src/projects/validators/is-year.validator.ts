import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsYear", async: false })
export class IsYear implements ValidatorConstraintInterface {
  validate(year: number) {
    const currentYear = new Date().getFullYear();
    return year >= 1000 && year <= currentYear;
  }

  defaultMessage() {
    return "Year must be between 1000 and the current year.";
  }
}
