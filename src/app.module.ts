import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './modules/global/global.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/global/guards/auth.guard';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [UserModule, GlobalModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ChatGateway,
  ],
})
export class AppModule {}
