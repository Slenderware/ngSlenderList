module.exports = function (grunt) {

 // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

// Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

    grunt.initConfig({
        // Project settings
        yeoman: appConfig,
        pkg: grunt.file.readJSON('package.json'),
        library: grunt.file.readJSON('bower.json'),
        clean: {
          files: ['dist']
        },
        concat: {
            options: {
                separator: ''
            },
            library: {
                src: [                   
                    'src/<%= library.name %>/<%= library.name %>.prefix',
                    'dist/<%= library.name %>.templatecache.js',
                    'src/<%= library.name %>/<%= library.name %>.js',
                    'src/<%= library.name %>/directives/**/*.js',
                    'src/<%= library.name %>/filters/**/*.js',
                    'src/<%= library.name %>/services/**/*.js',
                    'src/<%= library.name %>/<%= library.name %>.suffix'                   
                ],
                dest: 'dist/<%= library.name %>.js'
            }
        },
        html2js: {
          options: {
            base: 'dist',
            module: '<%= library.name %>.templates',
            singleModule: true,
            useStrict: true,
            htmlmin: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true
            }
          },
          main: {
            src: ['src/<%= library.name %>/template/<%= library.name %>.html'],
            dest: 'dist/<%= library.name %>.templatecache.js'
          }
        },
        cssmin: {
          combine: {
            files: {
              'dist/<%= library.name %>.min.css': ['src/<%= library.name %>/styles/<%= library.name %>.css']
            }
          }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            jid: {
                files: {
                    'dist/<%= library.name %>.min.js': ['<%= concat.library.dest %>']
                }
            }
        },
        jshint: {
            beforeConcat: {
                src: ['gruntfile.js', '<%= library.name %>/**/*.js']
            },
            afterConcat: {
                src: [
                    '<%= concat.library.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        },
         test: {
            options: {
              port: 9001,
              middleware: function (connect) {
                return [
                  connect.static('.tmp'),
                  connect.static('test'),
                  connect().use(
                    '/bower_components',
                    connect.static('./bower_components')
                  ),
                  connect.static(appConfig.app)
                ];
              }
            }
          },

        // Test settings
        karma: {
          unit: {
            configFile: 'karma-unit.conf.js',
            singleRun: true
          }
        },

        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*'
            ],
            tasks: ['default']
        }
    });

   
    grunt.registerTask('default', [ 'clean', 
                                    'html2js',
                                    'jshint:beforeConcat', 
                                    'concat', 
                                    'jshint:afterConcat', 
                                    'uglify',
                                    'cssmin']);

    grunt.registerTask('livereload', ['default', 'watch']);

};