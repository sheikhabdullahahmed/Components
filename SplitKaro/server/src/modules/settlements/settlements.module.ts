import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { SettlementsController } from './settlements.controller.js';
import { SettlementsService } from './settlements.service.js';

@Module({
  imports: [NotificationsModule],
  controllers: [SettlementsController],
  providers: [SettlementsService],
})
export class SettlementsModule {}
