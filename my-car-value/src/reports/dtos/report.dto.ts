import { Expose, Transform } from "class-transformer"

export class ReportDTO {
  @Expose()
  id: number

  @Expose()
  price: number

  @Expose()
  model: string

  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  mileage: number

  @Expose()
  approved: boolean

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  user_id: number
}