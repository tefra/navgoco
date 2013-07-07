'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('navgoco.jquery.json'),
		banner: '/*\n' +
				' * jQuery <%= pkg.title || pkg.name %> Plugin v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
				' * https://github.com/tefra/navgoco\n' +
				' *\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
				' * <%= pkg.licenses[0].type %> - <%= pkg.licenses[0].url %>\n' +
				' */\n',
		// Task configuration.
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/jquery.navgoco.js'],
				dest: 'src/jquery.navgoco.js'
			},
		},
		uglify: {
			dist: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'src/jquery.navgoco.min.js': ['src/jquery.navgoco.js'],
				}
			},
			libs: {
				options: {
					preserveComments: 'some'
				},
				files: {
					'src/jquery.cookie.min.js': ['src/jquery.cookie.js'],
				}
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: 'src/jquery.navgoco.js',
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src']
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);
};
