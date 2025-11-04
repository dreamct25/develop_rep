const { Worker } = require('worker_threads')
const os = require('os')

const cpus = Math.max(1, Math.floor(os.cpus().length / 4))

class MultipleThreads {
  constructor(workerFile, cpuThreads) {
    this.cpuThreads = cpuThreads || cpus;
    this.workerFile = workerFile;
    this.workers = [];
    this.queue = [];

    for (let i = 0; i < this.cpuThreads; i++) {
      const worker = new Worker(workerFile)
      worker.busy = false;

      worker.on('message', (message) => {
        // 處理進度訊息
        if (message && message.progress && !worker.callback) {
          worker.onProgress(message.progress);
          return;
        }

        // 處理結果
        worker.busy = false;
        const cb = worker.callback;
        worker.callback = null;

        if (!message) {
          cb(null, { error: 'Worker sent undefined message' });
          return;
        }

        if (message.error) {
          cb(null, { error: message.error });
        } else {
          cb(null, message.result ?? message); // message.result 一定存在
        }

        this.#next();
      });

      worker.on('error', (err) => {
        console.log(err)
        worker.busy = false;
        const cb = worker.callback;
        worker.callback = null;
        this.#next();
        cb(err, null);
      });

      this.workers.push(worker);
    }
  }

  #next() {
    if (!this.queue.length) return;
    const worker = this.workers.find(w => !w.busy);
    if (!worker) return;

    const { data, resolve, reject, onProgress } = this.queue.shift();
    worker.busy = true;
    worker.onProgress = onProgress;
    worker.callback = (err, result) => {
      if (err) reject(err);
      else resolve(result);
    };
    worker.postMessage(data);
  }

  run(data, onProgress) {
    return new Promise((resolve, reject) => {
      
      const worker = this.workers.find(w => !w.busy);
      
      if (worker) {
        worker.busy = true;
        worker.onProgress = onProgress;
        worker.callback = (err, result) => {
          if (err) reject(err);
          else resolve(result);
        };
        worker.postMessage(data);
      } else {
        this.queue.push({ data, resolve, reject, onProgress });
      }
    });
  }

  destroy() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.queue = [];
  }
}


module.exports = { MultipleThreads };