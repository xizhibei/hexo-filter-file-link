'use strict';

const linkHolder = require('./link-holder');


const ISSUE_LINK_REG = /(https:\/\/github.com\/[^/]+\/[^/]+\/issues\/\d+)/g;

function processContent(data) {
  linkHolder.add(data.issue_link, data.permalink);

  data.content = data.content.replace(ISSUE_LINK_REG, function(url) {
    const link = linkHolder.get(url);
    if (link) {
      return link;
    }
    linkHolder.wait(url, (link) => {
      data.content = data.content.replace(url, link);
    });
    return url;
  });
}

exports.process = function process(data) {
  // 只对本地文章处理
  if (data.layout === 'post') {
    processContent(data);
  }
};

exports.verifyComplete = function verifyComplete() {
  var urls = linkHolder.getWatchingNames();
  if (urls.length) {
    console.log('匹配不到下列 URL：' + urls.join(', '));
  }
};
