'use strict';

var metalsmith   = require('metalsmith');

var drafts       = require('metalsmith-drafts');
var markdown     = require('metalsmith-markdown');
var permalinks   = require('metalsmith-permalinks');
var templates    = require('metalsmith-templates');
var excerpts     = require('metalsmith-excerpts');
var collections  = require('metalsmith-collections');
var feed         = require('metalsmith-feed');
var pagination   = require('metalsmith-pagination');

var assets       = require('metalsmith-assets');
var sass         = require('metalsmith-sass');
var autoprefixer = require('metalsmith-autoprefixer');
var uglify       = require('metalsmith-uglify');
var imagemin     = require('metalsmith-imagemin');


function build (cb) {
  metalsmith(__dirname)
    // core
    .source('posts')
    .destination('_build')
    .metadata({
      site: {
        title: 'My Blog',
        url: 'http://my-url.sk',
        author: 'John Doe'
      }
    })

    // html
    .use(drafts())
    .use(markdown())
    .use(permalinks(':title'))
    .use(excerpts())

    // pagination
    .use(collections())
    .use(feed({collection: 'articles'}))
    .use(pagination({
      'collections.articles': {
        perPage: 2,
        template: 'loop.html',
        first: 'index.html',
        path: 'archive/:num/index.html',
        pageMetadata: {
          title: 'Archive'
        }
      }
    }))

    // templates
    .use(templates({
      engine: 'swig',
      directory: 'layouts'
    }))

    // assets
    .use(assets({
      source: './assets/',
      destination: './'
    }))

    // css
    .use(sass({
      includePaths: ['./assets/css']
    }))
    .use(autoprefixer())

    // js
    .use(uglify())

    // images
    .use(imagemin())

    .build(cb);
}

module.exports = build;
