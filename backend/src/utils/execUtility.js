import child_process from 'child_process';
import util from 'util';
// Promisify exec to use async/await
export const execPromisified = util.promisify(child_process.exec);