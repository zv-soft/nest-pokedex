import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto{

  @Min(1)
  @IsPositive()
  @IsOptional()
  @IsNumber()
  offset?:Number

  @Min(1)
  @IsPositive()
  @IsOptional()
  @IsNumber()
  limit?:Number
}