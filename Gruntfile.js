module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: '',
            },
            dist: {
                src: [
                    'html/head.html',
                    'separators/css_start.html',
                    'css/app.min.css',
                    'separators/css_end.html',
                    'php/parse.php',
                    'separators/js_start.html',
                    'js/libs/*.js',
                    'js/src/*.js',
                    'separators/js_end.html',
                    'html/footer.html'
                ],
                dest: 'index.php'
            }
        },
        watch: {
            build: {
                files: [
                    'php/*.php',
                    'html/*.html',
                    'js/app.min.js',
                    'css/app.min.css'
                    ],
                tasks: ['concat:dist']
            },
            uglifyjs: {
                files: [
                    'js/libs/*.js',
                    'js/src/*.js'
                    ],
                tasks: ['uglify:js']
            },
            lesscss: {
                files: ['css/less/*.less'],
                tasks: ['less:release']
            }
        },
        uglify: {
            js: {
                files: {
                    'js/app.min.js': [
                        'js/libs/*.js',
                        'js/src/*.js'
                    ]
                }
            }
        },
        less: {
            release: {
                options: {
                    compress: true
                },
                files: {
                    "css/app.min.css": "css/less/*.less"
                }
            },
        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
}