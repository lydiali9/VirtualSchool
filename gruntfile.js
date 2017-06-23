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
        learningPaths : grunt.file.readYAML('./src/design/data/learningPaths.yml'),
        sampleCourses: grunt.file.readYAML('./src/design/data/SampleCourseModules.yml'),
        assemble: {
            learningPathDetails: {
                options: {
                    layout: "./src/design/layouts/learningPath.html",
                    pages: '<%= learningPaths %>',
                    partials: "./src/design/partials/**/*.hbs",
                    helpers: "./src/design/helpers/**/*.js"
                },
                files: {
                  './src/design/pages/learningPaths/': ['!*']
                }
            },
            courseDetails: {
              options: {
                layout: "./src/design/layouts/courseModule.html",
                pages: '<%= sampleCourses %>',
                partials: "./src/design/partials/**/*.hbs",
                helpers: "./src/design/helpers/**/*.js"
              },
              files: {
                './src/design/pages/learningPaths/FinancialLiteracy/': ['!*']
              }
            }
        },
        clean: {
            options: { force: true },
            all: ['./src/design/pages/learningPaths/**/*']
        }
    });


    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('test', ['assemble']);
    grunt.registerTask('build', ['clean', 'assemble']);
    grunt.registerTask('default', function () {
      var msg = 'DO NOT USE DIRECTLY\n' +
        'to build this project use "gulp"\n' +
        'these are just grunt tasks to be used from gulp.';
      console.error(msg);
      process.exit(-1);
    });
};
