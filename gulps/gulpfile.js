var gulp = require('gulp');
var gulp_mocha = require('gulp-mocha');

gulp.task('test',function(){
   gulp.src('../tests/users.js')
       .pipe(gulp_mocha())
        .on('error',function(err){
           this.emit('end');
        });
});

gulp.task('watch',function(){
   gulp.watch('../tests/*.js' , ['test']);
});

