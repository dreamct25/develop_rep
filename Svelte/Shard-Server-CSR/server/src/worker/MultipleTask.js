const { parentPort } = require('worker_threads');

let taskHandler = undefined

const threadProcessHandler = handler => {
  taskHandler = handler;
}

if(parentPort !== null) {

  parentPort.on('message', async data => {
    if (!taskHandler) {
      parentPort.postMessage({ error: 'No task handler registered' });
      return;
    }

    try {
      const result = await taskHandler(data, parentPort);
      parentPort.postMessage(result);
    } catch (err) {
      parentPort.postMessage({ error: err.message });
    }
  });
}

module.exports = { threadProcessHandler }