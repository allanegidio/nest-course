import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from '../dtos/create-report.dto';
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
}
