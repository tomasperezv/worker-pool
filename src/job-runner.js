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
    resolve(12345);
  });
};

module.exports = JobRunner;
