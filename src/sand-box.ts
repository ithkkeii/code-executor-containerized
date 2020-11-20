import { exec } from 'child_process';
import { writeFile } from 'fs';

export class SandBox {
  constructor(
    private language: string,
    private code: string,
    private stdin: string,
    private folder: string,
    private path: string,
    private vmName: string,
    private timeout: number,
  ) {}

  private prepare() {
    const child = exec(
      `chmod 777 temp && mkdir ${this.path}/${this.folder} && cp src/payload/* ${this.path}/${this.folder}`,
      () => {
        writeFile(
          `${this.path}/${this.folder}/${Date.now()}.js`,
          this.code,
          err => {
            if (err) {
              console.log(err);
            } else {
              console.log('file saved');
              writeFile(
                `${this.path}/${this.folder}/input.txt`,
                this.stdin,
                err => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('file saved');
                  }
                },
              );
            }
          },
        );
      },
    );

    child.stderr.on('data', data => `child err: ${console.log(data)}`);

    child.stdout.on('data', data => console.log(data));
  }

  run() {
    this.prepare();
    return 'run complete';
  }
}
