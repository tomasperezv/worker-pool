/**
 * @module WorkerPool
 * @params {Object} options
 */
var WorkerPool = function(options) {
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
WorkerPool.prototype._attachEvents = function() {
  this._pool.on('ready', function(job) {
  });
};

/**
 * @method isAvailable
 * @returns {Boolean}
 * @private
 */
WorkerPool.prototype.isAvailable = function() {
  return typeof window.Worker !== 'undefined';
};

/**
 * @param {Function} job
 * @method run
 * @public
 */
WorkerPool.prototype.run = function(job) {
  if (this.isAvailable()) {
    this._pool.enqueue(job);
  } else {
    callback();
  }
};
