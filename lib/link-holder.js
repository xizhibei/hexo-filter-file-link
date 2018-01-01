'use strict';

const _store = Object.create(null);

const _watcher = Object.create(null);

var _flush = (name) => {
  var link = _store[name];
  var queue = _watcher[name];

  if (link && queue) {
    queue.forEach(fn => fn(link));
    delete _watcher[name];
  }
};

exports.wait = function wait(name, fn) {
  _watcher[name] || (_watcher[name] = []).push(fn);
};

exports.add = function add(name, link) {
  _store[name] = link;
  _flush(name);
};

exports.get = function get(name) {
  return _store[name];
};

exports.getWatchingNames = function getWatchingNames() {
  return Object.keys(_watcher);
};
