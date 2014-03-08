'use strict';

module.exports = function(grunt) {
	grunt.util.linefeed = '\n';
	grunt.initConfig({
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
		connect: {
			server: {
				options: {
					port: 8085
				}
			}
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
		qunit: {
			all: {
				options: {
					urls: [
						'2.1.0', '2.0.3', '2.0.2', '2.0.1', '2.0.0', '1.11.0', '1.10.2', '1.10.1',
						'1.10.0', '1.9.1', '1.9.0', '1.8.3', '1.8.2', '1.8.1', '1.8.0', '1.7.2', '1.7.1', '1.7.0'
					].map(function(version) {
						return 'http://localhost:<%= connect.server.options.port %>/test/index.html?jquery=' + version;
					})
				}
			},
			files: ['test/**/*.html']
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			qunit: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: 'test/navgoco.js',
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

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect', 'clean', 'jshint', 'concat', 'uglify', 'qunit']);
	grunt.registerTask('test', ['connect', 'jshint', 'qunit']);
};