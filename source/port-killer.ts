#!/usr/bin/env node

import { spawn, spawnSync } from "child_process";

export class Killer {

    private platform: string;
    private platforms = {
        win32: {
            command: 'Taskkill',
            args: ['/F', '/PID']
        }
    }

    constructor(platform: string) {
        this.platform = platform
    }

    public kill(port: number|string): Promise<string[]|null> {
        return this[this.platform](port)
    }

    public killByPid(pid: string): Promise<void> {
        return this.killByPids([pid])
    }

    public killByPids(pids: string[]): Promise<void> {

        const { command, args } = this.platforms[process.platform]

        pids.forEach(pid => {
            spawnSync(command, args.concat(pid))
        })

        return Promise.resolve()

    }

    private win32(port: number): Promise<string[]|null> {

        let resolver;
        let promise = new Promise(resolve => {
            resolver = resolve
        })

        const findstr = spawn('findstr', [`:${port}.*LISTENING`], { stdio: ['pipe'] })
        const netstat = spawn('netstat', ['-ano'], { stdio: ['ignore', findstr.stdin] })

        let result = '';

        findstr.stdout.on('data', data => result += data);
        findstr.on('close', () => {

            const pids = result.trim().match(/\d+$/mg)

            if (pids && pids.length) {
                this.killByPids(pids)
            }

            resolver(pids)

        });

        findstr.stdin.end();

        return promise

    }

}
