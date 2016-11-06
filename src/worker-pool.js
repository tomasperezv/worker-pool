const Pool = require('./pool');

/**
 * @module WorkerPool
 * @params {Object} options
 */
const WorkerPool = (options) => {
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
  this._pool = new Pool();

  this._attachEvents();
};

/**
 * @method _attachEvents
 * @private
 */
WorkerPool.prototype._attachEvents = () => {
  this._pool.on('ready', () => {
  });
};

/**
 * @method isAvailable
 * @returns {Boolean}
 * @private
 */
WorkerPool.prototype.isAvailable = () => (typeof window.Worker !== 'undefined');

/**
 * @param {Function} job
 * @method run
 * @public
 */
WorkerPool.prototype.run = (job) => {
  if (this.isAvailable()) {
    this._pool.enqueue(job);
  } else {
    job();
  }
};
