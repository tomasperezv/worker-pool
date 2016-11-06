/**
 * @module WebWorker
 */
self.addEventListener('message', (message) => {
  if (typeof message.job === 'function') {
    postMessage({ result: message.job() });
  }
}, false);
