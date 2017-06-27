/**!
 * The "wrapper" function
 * Project and task configuration
 * Loading Grunt plugins and tasks
 * Custom tasks
 */

// wrapper
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            index: {
                src: 'index.html',
                dest: 'build/index.html'
            }
        },
        clean: {
            all: {
                src: ['build/**/*'] //,
                //filter: 'isFile'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'build/src'
                }]
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            compress: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.css',
                    dest: 'build/src'
                }]
            }
        },
        cacheBust: {
            taskName: {
                options: {
                    assets: ['build/**'],
                    separator: '_'
                },
                src: ['build/index.html']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'cacheBust']);

};