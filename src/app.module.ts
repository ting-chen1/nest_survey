import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// nest generate controller todo
// 用 nest 的 controller genearator 建立會自動掛載到 app.module.ts
// 並加到 @Module 修飾器裡
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
