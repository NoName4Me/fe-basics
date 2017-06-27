# About Grunt

## Try It

```shell
# install grunt-cli global
npm install -g grunt-cli

# install grunt plugins
npm install

# grunt default: copy, uglify, cssmin, cacheBust
grunt

# and clean
grunt clen
```

## Gruntfile
```js
/*
 * 1. The "wrapper" function
 * 2. Project and task configuration
 * 3. Loading Grunt plugins and tasks
 * 4. Custom tasks
 */

// 1. Wrapper
module.exports = function(grunt) {
    //  2.Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            // ...
        },
        uglify: {
            // https://github.com/gruntjs/grunt-contrib-uglify
        }

        // other tasks
    });

    // 3. Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // other tasks plugins ....

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

    // or you can define some custom tasks like this
    grunt.registerTask('foo', 'My "foo" task.', function() {
        // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
        grunt.task.run('bar', 'baz');
        // Or:
        grunt.task.run(['bar', 'baz']);
    });
    // reference to https://gruntjs.com/creating-tasks#custom-tasks
};

```
