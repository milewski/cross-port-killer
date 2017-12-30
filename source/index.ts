import { Killer } from './port-killer'

export const killer = new Killer(process.platform)
export const kill = (port: number | string) => killer.kill(port)
export default kill
