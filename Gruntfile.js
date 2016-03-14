module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  // Project configuration.
  grunt.initConfig({
	pkg : pkg,
	closureCompiler : {
		options: {
			// [REQUIRED] Path to closure compiler
			compilerFile: '/Users/manni/MAMPServer/00_lib/compiler-latest/compiler.jar',

			// [OPTIONAL] set to true if you want to check if files were modified
			// before starting compilation (can save some time in large sourcebases)
			checkModified: true,

			// [OPTIONAL] Set Closure Compiler Directives here
			compilerOpts: {
				compilation_level: 'SIMPLE_OPTIMIZATIONS',
				//externs: ['path/to/file.js', '/source/**/*.js'],
				//define: ["'goog.DEBUG=false'"],
// 				formatting: 'pretty_print',
				warning_level: 'verbose',
				jscomp_off: ['checkTypes', 'fileoverviewTags'],
				summary_detail_level: 3,
				externs:['src/dependencies/wodo.js']
// 				output_wrapper: '"(function(){%output%}).call(this);"'
			},
			// [OPTIONAL] Set exec method options
			execOpts: {
				maxBuffer: 999999 * 1024
			},
			//d32: true, // will use 'java -client -d32 -jar compiler.jar'
			TieredCompilation: true // will use 'java -server -XX:+TieredCompilation -jar compiler.jar'
		},

		// any name that describes your task
		ccompile: {

			// [OPTIONAL] Target files to compile. Can be a string, an array of strings
			// or grunt file syntax (<config:...>, *)
// 			src: 'dist/pjs.js',

			// [OPTIONAL] set an output file
// 			dest: 'dist/pjs.closure.js'

// 			cwd: 'src',
			src: [ 'build/sourceCode/*.js' ],
			dest: 'build/sourceCode/jquery.uic-form3.cc.js'
		}
	},
    clean: {
      dev: {
        src: [ 'dev/*' ]
      },
      build: {
        src: [ 'build/*' ]
      },
    },
    copy: {
      dev: {
        cwd: 'src',
        src: [ '**'],
        dest: 'dev',
        expand: true
      },
      build: {
        cwd: 'src',
        src: [ '**'],
        dest: 'build',
        expand: true
      },
    },
    uglify: {
      build: {
        options: {
			options : {
				banner : '/*!\n\t <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %>' + '\n\t requires: jQuery\n*/\n'
			},
        },
        cwd: 'src',
        src: [ 'sourceCode/**/*.js' ],
        dest: 'build',
        expand: true
      }
    }
 });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask(
    'publishdev', 
    'Publish vor development', 
    [ 'clean:dev', 'copy:dev' ]
  );

  grunt.registerTask(
    'publishbuild', 
    'Publish for production use', 
    [ 'clean:build', 'copy:build', 'uglify:build' ]
  );

  grunt.registerTask(
    'publishcompiled', 
    'Publish for production use', 
    [ 'clean:build', 'copy:build', 'closureCompiler', 'uglify:build' ]
  );

  grunt.registerTask('default', ['clean']);

};