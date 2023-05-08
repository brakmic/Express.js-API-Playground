import { Controller, Get } from 'routing-controllers';

@Controller()
export class HomeController {
  @Get('/')
  getRoot() {
    return 'Hello, world!';
  }
}
