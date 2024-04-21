import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [UserModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
