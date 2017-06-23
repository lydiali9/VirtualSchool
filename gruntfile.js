module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("test/partials/footer", require("./test/partials/footer.hbs"));
        Handlebars.registerPartial("test/partials/navbar", require("./test/partials/navbar.hbs"));
    }

    return {
        setup: setup
    };
};

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        data : grunt.file.readYAML('./src/data/learningPaths.yml'),
        assemble: {
            learningPathDetails: {
                options: {
                    layout: "./src/layouts/learningPath.html",
                    pages: '<%= data %>',
                    partials: "./src/partials/**/*.hbs",
                    helpers: "./src/helpers/**/*.js"
                },
                files: {
                  './src/pages/learningPaths/': ['!*']
                }
            },
            /*courseDetails: {
              options: {
                  layout: "./src/layouts/course.html",
                  pages: '<%= data.learningPaths %>'
              },
              files: {
                './src/pages/courses/<%= data.learningPaths.filename %>': ['!*']
              }
            }*/
        },
        clean: {
            options: { force: true },
            all: ['./src/pages/learningPaths/**/*', './src/pages/courses/**/*']
        }
    });

    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('build', ['clean', 'assemble']);
    grunt.registerTask('default', function () {
      var msg = 'DO NOT USE DIRECTLY\n' +
        'to build this project use "gulp"\n' +
        'these are just grunt tasks to be used from gulp.';
      console.error(msg);
      process.exit(-1);
    });
};
