
module.exports = function(grunt){



	grunt.initConfig({
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'css/',
		      src: ['style.css'	],
		      dest: 'css/',
		      ext: '-min.css'
		    }]
		  }
		},

		uglify: {
		    my_target: {
		      files: {
		        'js/main.min.js': ['js/main.js']
		      },
		    },
		  },
		
				concat: {
		  js: {
			src: ['js/bootstrap.js','js/instafeed.min.js','js/jquery.roundabout.min.js','js/main.js','js/bootstrap.min.js'],
			dest: 'build/js/scripts.js',
		},
		css: {
			src: ['css/bootstrap.css','css/bootstrap.min.css','css/style.css'],
			dest: 'build/css/styles.css',
		},
	   },
	   watch: {
	   	js:{
	   		files:['js/**/*.js'],
	   		tasks:['uglify'],
	   	},
	   	css:{
	   		files:['css/style.css'],
	   		tasks:['cssmin'],
	   	},
	   },
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['uglify', 'watch', 'concat','cssmin']);




};