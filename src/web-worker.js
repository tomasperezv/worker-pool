/**
 * @module WebWorker
 */
addEventListener('message', (message) => {
  if (typeof message.data.job === 'string') {
    const job = new Function(message.data.job)(); // eslint-disable-line no-new-func
    postMessage({ result: job() });
  }
}, false);
