'use strict';

var api = require('./lib/api');

hexo.extend.filter.register('before_post_render', api.process);

hexo.extend.filter.register('after_generate', api.verifyComplete);
