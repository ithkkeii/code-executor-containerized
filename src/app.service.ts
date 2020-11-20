import { Injectable } from '@nestjs/common';
import { SandBox } from './sand-box';

@Injectable()
export class AppService {
  getCompile(): string {
    const language = 'javascript';
    const code = '';
    const stdin = '';
    const folder = Date.now().toString();
    const path = 'temp';
    const vmName = 'temp';
    const timeout = 10;

    const sandbox = new SandBox(
      language,
      code,
      stdin,
      folder,
      path,
      vmName,
      timeout,
    );

    const result = sandbox.run();
    console.log(result);

    return 'Hello World!';
  }
}
