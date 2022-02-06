import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { ApproveReportDTO } from '../dtos/approve-report.dto';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { GetEstimateDTO } from '../dtos/get-estimate.dto';
import { ReportDTO } from '../dtos/report.dto';
import { ReportsService } from '../services/reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService
  ) { }

  @Get()
  getEstimate(@Query() query: GetEstimateDTO)
  {
    console.log('bunda')
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    console.log(id)
    return this.reportsService.approve(id, body.approved)
  }
}
