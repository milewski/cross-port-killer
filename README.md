# cross-port-killer

[![Build Status](https://travis-ci.org/milewski/cross-port-killer].svg?branch=master)](https://travis-ci.org/milewski/cross-port-killer)
[![npm version](https://badge.fury.io/js/cross-port-killer].svg)](https://badge.fury.io/js/cross-port-killer)
[![npm downloads](https://img.shields.io/npm/dm/cross-port-killer].svg)](https://www.npmjs.com/package/cross-port-killer)
[![dependencies](https://david-dm.org/milewski/cross-port-killer].svg)](https://www.npmjs.com/package/cross-port-killer)
[![greenkeeper](https://badges.greenkeeper.io/milewski/cross-port-killer].svg)](https://greenkeeper.io)

Kill the process running on a given TCP/UDP port on **Windows**, **Linux** and **Mac**

## Install

```bash
$ npm install cross-port-killer -D
```

## Usage

```js
import { kill, killer } from 'cross-port-killer';

kill(9090).then(pids => {
  console.log(pids)
})

// you could also kill pids manually if you know them... this would save you bringing up another lib, you are welcome.

killer.killByPid(12345).then(() => console.log('done'))
killer.killByPids([12345, 54321]).then(() => console.log('done'))
```
This lib also comes with a `CLI`.

```bash
$ npm install cross-port-killer -g
```
```bash
$ kill-port 9090
```

## License 

[MIT](LICENSE) © [Rafael Milewski](https://rafael-milewski.com?github=readme)
