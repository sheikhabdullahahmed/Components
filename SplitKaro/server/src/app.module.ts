import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { BalancesModule } from './modules/balances/balances.module.js';
import { ExpensesModule } from './modules/expenses/expenses.module.js';
import { FriendsModule } from './modules/friends/friends.module.js';
import { GroupsModule } from './modules/groups/groups.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { SettlementsModule } from './modules/settlements/settlements.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    FriendsModule,
    GroupsModule,
    ExpensesModule,
    BalancesModule,
    NotificationsModule,
    SettlementsModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
