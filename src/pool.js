/**
 * @module Pool
 */
var Pool = function() {
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
};

/**
 * @method enqueue
 * @param {Function} job
 */
Pool.prototype.enqueue = function(job) {
  if (typeof job === 'function') {
    this._queue.push(job);
  }
};

/**
 * @method enqueue
 * @returns {Function|null}
 */
Pool.prototype.dequeue = function() {
  var job = null;
  if (this._queue.length > 0) {
    job = this._queue.pop();
  }

  return job;
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
