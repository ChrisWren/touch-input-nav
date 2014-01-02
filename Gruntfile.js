module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    browser_sync: {
      dev: {
        bsFiles: {
          src : 'dist/**'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'dist'
          }
        }
      }
    },
    copy: {
      'dist/touch-input-nav.js': 'touch-input-nav.js',
      'dist/index.html': 'test/fixtures/index.html'
    },
    uglify: {
      dist: {
        files: {
          'touch-input-nav.min.js': ['touch-input-nav.js']
        }
      }
    },
    watch: {
      dev: {
        files: ['test/fixtures/index.html', 'touch-input-nav.js'],
        tasks: ['copy']
      }
    }
  });

  grunt.registerTask('default', ['copy', 'browser_sync', 'watch']);

  require('load-grunt-tasks')(grunt);
};

