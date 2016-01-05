/**
 * Created by lgould12 on 04/01/2016.
 */
module.exports = function (grunt) {
  grunt.initConfig({
    nodemon: {
      all: {
        script: 'server.js',
        options: {
          watchedExtensions: ['js']
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('default', ['nodemon']);
};