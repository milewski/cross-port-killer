import * as expect from "expect.js";
import { spawn } from "child_process";
import { Killer } from "../source/port-killer";
import * as psList from 'ps-list';

describe('Assassin', () => {

    it('should terminate process running on a given port', done => {

        const server = spawn('node', [require.resolve('http-server/bin/http-server'), '-p', '7070'], {
            stdio: 'ignore',
            detached: true
        })

        server.unref();

        setTimeout(() => {
            new Killer(process.platform)
                .kill(7070)
                .then(pid => expect(server.pid.toString()).to.be(pid.pop()) && psList())
                .then(data => {
                    for (let { pid } of data) expect(pid).not.to.be(server.pid)
                })
                .then(done)
        }, 500)

    })

})
