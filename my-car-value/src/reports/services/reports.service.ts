import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { GetEstimateDTO } from '../dtos/get-estimate.dto';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>
  ) { }

  async create(dto: CreateReportDTO, user: User) : Promise<Report> {
    const report = await this.reportsRepository.create(dto)
    
    report.user = user

    const result = await this.reportsRepository.save(report)

    return result
  }

  async approve(id: string, approved: boolean) {
    const report = await this.reportsRepository.findOne(id)

    if (!report)
      throw new NotFoundException('Report not found.')

    report.approved = approved

    return this.reportsRepository.save(report)
  }

  async createEstimate(dto: GetEstimateDTO) {
    return this.reportsRepository.createQueryBuilder()
                                .select('AVG(price)', 'price')
                                .where('make = :make', { make: dto.make })
                                .andWhere('model = :model', { model: dto.model })
                                .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: dto.lng })
                                .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: dto.lat })
                                .andWhere('year - :year BETWEEN -3 AND 3', { year: dto.year })
                                .andWhere('approved IS TRUE')
                                .orderBy('ABS(mileage - :mileage)', 'DESC')
                                .setParameters({ mileage: dto.mileage })
                                .limit(3)
                                .getRawOne()
  }
}
