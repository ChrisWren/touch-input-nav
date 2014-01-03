module.exports = function (grunt) {
  'use strict';

  var config = {
    moduleLoader: process.env.moduleLoader
  };

  grunt.initConfig({
    config: config,
    browser_sync: {
      dev: {
        bsFiles: {
          src: 'dist/**'
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
      'dist/require.js': 'bower_components/requirejs/require.js',
      'dist/jquery.js': 'bower_components/jquery/jquery.js',
      'dist/requirejs-test.js': 'test/fixtures/requirejs-test.js'
    },
    uglify: {
      dist: {
        files: {
          'touch-input-nav.min.js': ['touch-input-nav.js']
        }
      }
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      dev: {
        files: ['test/fixtures/index.ejs', 'touch-input-nav.js'],
        tasks: ['ejs-module:nomodule', 'copy']
      },
      browserify: {
        files: ['test/fixtures/browserify-test.js'],
        tasks: ['ejs-module:browserify', 'browserify']
      },
      requirejs: {
        files: ['test/fixtures/requirejs-test.js'],
        tasks: ['copy', 'ejs-module:requirejs']
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/build.js': ['test/fixtures/browserify-test.js'],
        }
      }
    },
    ejs: {
      all: {
        src: 'test/fixtures/index.ejs',
        dest: 'dist/index.html'
      },
      options: {
        moduleLoader: '<%= config.moduleLoader %>'
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });

  grunt.registerTask('ejs-module', 'Compiles ejs with the specified module loader', function (chosenModuleLoader) {
    config.moduleLoader = chosenModuleLoader;
    grunt.task.run('ejs');
  });

  grunt.registerTask('default', ['copy', 'ejs', 'browser_sync', 'watch']);
  grunt.registerTask('deploy', ['copy', 'ejs', 'gh-pages']);

  require('load-grunt-tasks')(grunt);
};
