# hexo-filter-github-issue-link

A plugin to make convenient for convert github issues link to hexo permalink in markdown style

## Installation

cd to hexo root

```
npm install hexo-filter-github-issue-link --save
```

Hexo will detect automatically

## Important
You must put the `issue_link` at the head of your post.

## Example

Say you have the `issues1.md`

```
---
title: example-title1
issue_link: https://github.com/<your-name>/<your-blog-repo>/issues/1
---
bla bla bla
```

And here is content of `issues2.md`

```
---
title: example-title2
issue_link: https://github.com/<your-name>/<your-blog-repo>/issues/2
---
bla bla bla

[Link to issues1](https://github.com/<your-name>/<your-blog-repo>/issues/1)

bla bla bla
```

After process of `hexo-filter-github-issue-link` and before `render`

`issues2.md` will be transformed as:

```
bla bla bla

[Link to issues1](http://yoursite.com/the-permalink-of-issues1)

bla bla bla
```

This is a real url which capturing during `before_post_render` event

### Thanks

Original code is from [zhenyong/hexo-filter-file-link](https://github.com/zhenyong/hexo-filter-file-link)
