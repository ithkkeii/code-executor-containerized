import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { SandBox } from './sand-box';

@Injectable()
export class AppService {
  getCompile(): string {
    const language = 'javascript';
    const code = '';
    const stdin = '';
    const folder = Date.now().toString();
    const path = __dirname;
    const containerName = 'sandbox';
    const timeout = 1;

    const sandbox = new SandBox(
      language,
      code,
      stdin,
      folder,
      path,
      containerName,
      timeout,
    );
    // const st =
    //   path +
    //   'DockerTimeout.sh ' +
    //   timeout +
    //   "s -u mysql -e 'NODE_PATH=/usr/local/lib/node_modules' -i -t -v  \"" +
    //   path +
    //   folder +
    //   '":/usercode ' +
    //   vmName +
    //   ' /usercode/script.sh ' +
    //   'compilerName' +
    //   ' ' +
    //   'fileName' +
    //   ' ' +
    //   'output_command' +
    //   ' ' +
    //   'extra_arguments';

    const statement = `${path}/docker-timeout.sh ${timeout}s --name ${containerName} -v ${path}/temp/${folder}:/usercode test:latest mkdir usercode/ditconme`;

    console.log(statement);

    const child = exec(statement);

    child.stderr.on('data', data => `child err: ${console.log(data)}`);

    child.stdout.on('data', data => console.log(data));

    const result = sandbox.run();
    console.log(result);

    return 'Hello World!';
  }
}
