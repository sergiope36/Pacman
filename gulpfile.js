var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer')

gulp.task('autoprefixer', () =>
    gulp.src('styles/*.scss')
    .pipe(gulp.dest('styles/css'))  
) 

gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade:false
        }))
        .pipe(gulp.dest('styles/css'))
})      

gulp.task('watch', function(){
    gulp.watch('styles/*.scss', gulp.series('sass'))
        
       


})