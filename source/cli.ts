#!/usr/bin/env node

import { kill } from './index'

kill(process.argv[2]).then(pids => {
    console.log(pids ? `${pids.length} process was killed` : 'no processes was found listening on the given port.')
})
