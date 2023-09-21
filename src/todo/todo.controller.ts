import {
  Controller,
  Body,
  Header,
  Get,
  Post,
  Patch,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Request,
  Render
} from '@nestjs/common';
// 下方使用到的修飾器就要引入

import { ChangeTodoDto } from './dto/change-todo.dto';
// 除了可以直接列出接收的參數，還可以用 data transfer object 處理

@Controller('todos')
// 做出 routes 的前綴， /todos
// 下方的路徑都會接在 /todos/ 之後

export class TodoController {
  @Get()
  // 指定 哪個路徑用哪個 http method
  // 後續接著的是執行的方法
  // 這裡是用 get 打到 /todos
  // 並用 getAll function 的回傳值，傳給 client
  getAll() {
    return [];
  }

  @Get('/examples')
  // get /todos/examples
  getExample() {
    return [
      {
        id: 1,
        title: 'Example 1',
        description: '',
      },
    ];
  }

  @Get('/show/:id')
  // 這裏的 :id 是 route param
  // 想在後續方法使用需要用 @Param 修飾器
  // param 修飾器 可以用下方 getShow 與 getShowItem 的方式使用
  getShow(@Param() params: { id: string }) {
    const { id } = params;
    return {
      id,
      title: `Title ${id}`,
      description: 'show page',
    };
  }

  @Get('/showitem/:id')
  getShowItem(@Param('id') id: string) {
    return {
      id,
      title: `Title ${id}`,
      description: 'showitem',
    };
  }

  @Get('/list')
  // @Query 是 query param 使用方法與 @Param 一樣
  // 用於處理 /list?limit=10&skip=0 這樣的查詢參數
  getList(@Query() query: { limit: number; skip: number }) {
    const { limit = 30, skip = 0 } = query;
    // 這裡是帶入預設值，有帶參數則用參數

    const list = [
      {
        id: 1,
        title: 'Title 1',
        description: '',
        limit: limit,
      },
      {
        id: 2,
        title: 'Title 2',
        description: '',
        skip: skip,
      },
    ];

    return list.slice(skip, limit);
  }

  @Get('/todo_list')
  getTodoList(
    @Query('limit') limit: number = 30,
    @Query('skip') skip: number = 0,
  ) {
    const list = [
      {
        id: 1,
        title: 'Title 1',
        description: '',
        limit: limit,
      },
      {
        id: 2,
        title: 'Title 2',
        description: '',
        skip: skip,
      },
    ];

    return list.slice(skip, limit);
  }

  @Patch('/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  // 可以指定回傳資訊時的 http code
  update() {
    console.log(HttpStatus)
    return [];
  }

  @Post('/create')
  // 使用 @Body 來解析 request body
  // 解析方法有以下兩種
  create(@Body() data: { title: string; description: string }) {
    console.log(data);
    const id = 1;
    return { id, ...data };
  }

  @Post('/modify')
  modify(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return {
      id: 1,
      title,
      description,
    };
  }

  @Post('/change')
  // dto 處理 request body
  change(@Body() dto: ChangeTodoDto) {
    return {
      id: 1,
      ...dto,
    };
  }

  @Get('/set_header')
  @Header('X-Hao-headers', '1')
  // 指定 header
  getHeader() {
    return {
      header: '1',
    };
  }

  @Get('/get_request')
  // 使用 request object
  getRequest(@Request() request): string {
    console.log('keys', Object.keys(request))
    console.log('params', request.params)
    console.log('originalUrl', request.originalUrl)
    console.log('next', request.next)
    console.log('ip', request.ip)
    return 'here'
  }

  @Get('/async')
  getAsync() {
    // 支援非同步
    return new Promise((resolve, reject) => setTimeout(() => resolve([]), 1000))
  }


  // https://stackoverflow.com/questions/54098773/nestjs-multiple-views-directory
  // https://stackoverflow.com/questions/72686788/how-to-use-ejs-template-engine-with-nestjs
  // https://www.gowhich.com/blog/1063
  @Get('/todo_view')
  @Render('todo_view')
  // 用 nest 渲染畫面，傳到 client 端
  // 模板的位置由 main.js 那邊設定
  getTodoView() {
    return { message: 'Hello world!' };
  }

  @Get('/todo_next_view')
  @Render('todo_next_view')
  getTodoNextView() {
    return { message: 'Hello world!, todo_next_view' };
  }

  // 將 ejs render 成 string ，模擬審核操作
  @Get('/render_to_string')
  getRenderToString() {
    const ejs = require('ejs');
    const fs = require('fs')

    // const template = '<h1>Hello <%= name %></h1>';
    // const data = { name: 'World' };
    // const html = ejs.render(template, data);
    // console.log(html)
    // const template = fs.readFileSync(__dirname + '/template.ejs', 'ascii')

    const template = fs.readFileSync(__dirname + '/render_to_string.ejs', 'ascii')
    // 暫時將要渲染成字串的模板放到 controller
    const data = { message: 'Hello world!, render_to_string' };
    const html = ejs.render(template, data);
    console.log(html)

    return 'render_to_string'
  }
}
