export function runWorker(worker:any, data:any) {
  return new Promise((resolve, reject) => {
    worker.onmessage = (e:any) => resolve(e.data);
    worker.onerror = (err:any) => reject(err);
    worker.postMessage(data);
  });
}