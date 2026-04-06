import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import type { HealthCheckResult } from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaHealthIndicator } from './prisma.health';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Basic liveness check' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  check(): HealthCheckResult {
    return { status: 'ok', details: {} };
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe - Kubernetes style' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  liveness(): HealthCheckResult {
    return { status: 'ok', details: {} };
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: 'Readiness probe - checks all dependencies' })
  @ApiResponse({ status: 200, description: 'Service is ready' })
  @ApiResponse({ status: 503, description: 'Service not ready' })
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([() => this.prismaHealth.isHealthy('database')]);
  }

  @Get('details')
  @HealthCheck()
  @ApiOperation({ summary: 'Detailed health status with all indicators' })
  @ApiResponse({ status: 200, description: 'Detailed health info' })
  async details(): Promise<HealthCheckResult> {
    return this.health.check([() => this.prismaHealth.isHealthy('database')]);
  }
}
