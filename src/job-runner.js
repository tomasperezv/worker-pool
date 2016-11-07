/**
 * @param {Object} options
 * @module Pool
 */
const JobRunner = function constructor() {
};

/**
 * @param {Function} job
 * @method execute
 * @returns {Promise}
 * @public
 */
JobRunner.prototype.execute = function(job) {
  return new Promise((resolve) => {
    const worker = new Worker('web-worker.js');

    worker.addEventListener('message', (message) => {
      resolve(message.data.result);
    }, false);

    worker.postMessage({ job: `return ${job.toString()}` });
  });
};

module.exports = JobRunner;
