'use strict';

var assert = require('assert');
var fs = require('fs')
var build = require('../metalsmith.js');


describe('Site generation works', function () {
  it('It should not throw error when generating site', function (cb) {
    build(function (err) {
      assert.equal(err, null);
      cb();
    });
  });

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
    fs.readdir('_build/archive', function (err, files) {
      assert.equal(err, null);

      fs.exists('_build/archive/' + files.length / 2 + '/index.html', function (exists) {
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
