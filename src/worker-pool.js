const Pool = require('./pool');

/**
 * @module WorkerPool
 * @params {Object} options
 */
const WorkerPool = function constructor(options = {}) {
  /**
   * _options
   * @type {Object}
   * @private
   */
  this._options = {
    maxParallelJobs: options.maxParallelJobs || 5
  };

  /**
   * _pool
   * @type {Pool}
   * @private
   */
  this._pool = new Pool({
    maxParallelJobs: this._options.maxParallelJobs
  });
};

/**
 * @method isAvailable
 * @returns {Boolean}
 * @private
 */
WorkerPool.prototype.isAvailable = () => (typeof window.Worker !== 'undefined');

/**
 * @param {Function} run
 * @method run
 * @returns {Promise}
 * @public
 */
WorkerPool.prototype.run = function(job) {
  const self = this;
  return new Promise((resolve, reject) => {
    if (this.isAvailable()) {
      const jobId = self._pool.enqueue(job);
      self._pool.on('ready', (result) => {
        if (result.id === jobId) {
          resolve(result.data);
        }
      });

      self._pool.on('error', (id) => {
        if (id === jobId) {
          reject();
        }
      });
    } else {
      try {
        const result = job();
        resolve(result);
      } catch (e) {
        reject();
      }
    }
  });
};

module.exports = WorkerPool;
