import { Expose, Transform } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  long: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;
  
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}