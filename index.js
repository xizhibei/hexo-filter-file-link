'use strict';

const linkHolder = require('./lib/link-holder');

const log = hexo.log;

const ISSUE_LINK_REG = /(https:\/\/github.com\/[^/]+\/[^/]+\/issues\/\d+)/g;

function processContent(data) {
  linkHolder.add(data.issue_link, data.permalink);

  data.content = data.content.replace(ISSUE_LINK_REG, function(url) {
    // 如果含有指向当前页面所代表的 issues link，则不转换，因为这一般是保留链接，而不是引用s
    if (url === data.issue_link) return url;

    const link = linkHolder.get(url);
    if (link) return link;

    linkHolder.wait(url, (link) => {
      data.content = data.content.replace(url, link);
    });

    return url;
  });
}

function process(data) {
  // 只对本地文章处理
  if (data.layout === 'post') {
    processContent(data);
  }
}

function verifyComplete() {
  var urls = linkHolder.getWatchingNames();
  if (urls.length) {
    log.e('匹配不到下列 URL：' + urls.join(', '));
  }
}

hexo.extend.filter.register('before_post_render', process);

hexo.extend.filter.register('after_generate', verifyComplete);
