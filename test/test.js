'use strict';

var fs = require('fs')
var assert = require('assert');

describe('Site generation works', function () {
  it('It should generate index', function (cb) {
    fs.exists('_build/index.html', function (exists) {
      assert(exists);
      cb();
    });
  });

  it('It should generate RSS', function (cb) {
    fs.exists('_build/rss.xml', function (exists) {
      assert(exists);
      cb();
    });
  });

  it('It should copy assets', function (cb) {
    fs.exists('_build/img/bg.png', function (exists) {
      assert(exists);
      cb();
    });
  });

  it('It should generate pagination', function (cb) {
    fs.readdir('posts', function (err, files) {
      assert.equal(err, null);

      fs.exists('_build/archive/' + Math.ceil(files.length / 2) + '/index.html', function (exists) {
        assert(exists);
        cb();
      });
    })
  });

  it('It should compile sass', function (cb) {
    fs.exists('_build/css/style.css', function (exists) {
      assert(exists);
      cb();
    });
  });

  it('It should minify javascript', function (cb) {
    fs.exists('_build/js/app.min.js', function (exists) {
      assert(exists);
      cb();
    });
  });
});
