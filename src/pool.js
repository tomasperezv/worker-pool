const JobRunner = require('./job-runner');

/**
 * @param {Object} options
 * @module Pool
 */
const Pool = function constructor(options = {}) {
  /**
   * _options
   * @type {Object}
   * @private
   */
  this._options = {
    maxParallelJobs: options.maxParallelJobs || 5
  };

  /**
   * @type {Array} _queue
   * @private
   */
  this._queue = [];

  /**
   * @type {Object} _listeners
   * @private
   */
  this._listeners = {};

  /**
   * @type {Object} _runner
   * @private
   */
  this._runner = new JobRunner();
};

/**
 * @param {Function} job
 * @returns {Promise}
 * @method enqueue
 * @public
 */
Pool.prototype.enqueue = function(job) {
  const jobId = this._generateJobId();

  if (typeof job === 'function') {
    if (this._queue.length < this._options.maxParallelJobs) {
      this._runner.execute(job)
        .then((result) => {
          this._trigger('ready', { id: jobId, data: result });
        })
        .catch(() => {
          this._trigger('error', { id: jobId, data: null });
        });
    } else {
      this._queue.push(job);
    }
  } else {
    this._trigger('error', jobId);
  }

  return jobId;
};

/**
 * @method enqueue
 * @returns {Function|null}
 */
Pool.prototype.dequeue = function() {
  let job = null;
  if (this._queue.length > 0) {
    job = this._queue.pop();
  }

  return job;
};

/**
 * @params {String} eventId
 * @params {Object} result
 * @method _trigger
 * @private
 */
Pool.prototype._trigger = function(eventId, result) {
  if (typeof this._listeners[eventId] !== 'undefined') {
    this._listeners[eventId].forEach((listener) => {
      listener(result);
    });
  }
};

/**
 * @method on
 * @params {String} eventId
 * @params {Function} listener
 * @public
 */
Pool.prototype.on = function(eventId, listener) {
  if (typeof this._listeners[eventId] === 'undefined') {
    this._listeners[eventId] = [];
  }

  this._listeners[eventId].push(listener);
};

/**
 * @params {String} eventId
 * @returns {String}
 * @method _generateJobId
 * @private
 */
Pool.prototype._generateJobId = function() {
  const id = new Uint32Array(3);
  window.crypto.getRandomValues(id);

  return id.join('');
};

module.exports = Pool;
