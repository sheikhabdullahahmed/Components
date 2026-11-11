import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { StorageModule } from '../storage/storage.module.js';
import { ExpensesController } from './expenses.controller.js';
import { ExpensesService } from './expenses.service.js';

@Module({
  imports: [StorageModule, NotificationsModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
