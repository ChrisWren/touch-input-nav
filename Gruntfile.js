module.exports = function (grunt) {
  'use strict';

  if (grunt.file.exists('./.saucelabs.js')) {
    require('./.saucelabs');
  }

  var config = {
    moduleLoader: process.env.moduleLoader
  };

  grunt.initConfig({
    config: config,
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: [
          'touch-input-nav.js',
          'Gruntfile.js',
          'test/**.js'
        ]
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          urls: ['http://localhost:9001/qunit.html'],
          browsers: [{
            browserName: 'chrome',
          }]
        }
      }
    },
    copy: {
      dev: {
        files: {
          'dist/touch-input-nav.js': 'touch-input-nav.js',
          'dist/require.js': 'bower_components/requirejs/require.js',
          'dist/jquery.js': 'bower_components/jquery/jquery.js',
          'dist/requirejs-test.js': 'test/fixtures/requirejs-test.js'
        }
      },
      qunit: {
        files: [{
          cwd: 'bower_components/qunit/qunit',
          src: '**',
          dest: 'dist',
          expand: true
        }, {
          'dist/jquery.js': 'bower_components/jquery/jquery.js',
          'dist/touch-input-nav.js': 'touch-input-nav.js',
          'dist/qunit.html': 'test/fixtures/qunit.html',
          'dist/tests.js': 'test/tests.js'
        }]
      }
    },
    clean: ['dist'],
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
        tasks: ['ejs-module:nomodule', 'copy'],
        options: {
          livereload: true
        }
      },
      browserify: {
        files: ['test/fixtures/browserify-test.js'],
        tasks: ['ejs-module:browserify', 'browserify'],
        options: {
          livereload: true
        }
      },
      requirejs: {
        files: ['test/fixtures/requirejs-test.js'],
        tasks: ['copy', 'ejs-module:requirejs'],
        options: {
          livereload: true
        }
      },
      qunit: {
        files: ['test/tests.js', 'test/fixtures/qunit.html'],
        tasks: ['test'],
        options: {
          livereload: true
        }
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
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: 9001,
          base: 'dist',
          livereload: true,
          open: 'http://localhost:9001'
        }
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

  grunt.registerTask('test', ['clean', 'jshint', 'copy:qunit', 'connect', 'saucelabs-qunit']);
  grunt.registerTask('debug-test', ['browser_sync', 'watch']);

  grunt.registerTask('default', ['copy', 'ejs', 'connect', 'watch']);
  grunt.registerTask('deploy', ['copy', 'ejs', 'gh-pages']);

  require('load-grunt-tasks')(grunt);
};
