var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css');
    pump = require('pump');
// 压缩主文件js
gulp.task('CompressedFile',function(){
    pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist/js/')
    ])
})
gulp.task('plugins',function(){
    pump([
        gulp.src('js/plugins/**/*.js'),
        uglify(),
        gulp.dest('dist/js/plugins')
    ])
})
gulp.task('commonjs',function(){
    pump([
        gulp.src('js/common/jquery.common.js'),
        uglify(),
        gulp.dest('dist/js/common')
    ])
})
gulp.task('login',function(){
    pump([
        gulp.src('js/common/LoginAuthorization.js'),
        uglify(),
        gulp.dest('dist/js/common')
    ])
})
// 合并压缩css
gulp.task('ConCatCss',function(){
    return gulp.src('css/*.css')
                .pipe(concatCss('common.css'))
                .pipe(gulp.dest('temp/css'))
})
gulp.task('CleanCss',['ConCatCss'],function(){
    return gulp.src('temp/css/*.css')
                .pipe(cleanCSS())
                .pipe(gulp.dest('dist/css'))
})
gulp.task('cleanTemp',['CleanCss'],function(){
    return gulp.src('temp')
                .pipe(clean({force:true}))
})

gulp.task('default', ['CompressedFile','cleanTemp','commonjs','login','cleanTemp']);
gulp.task('css',['cleanTemp'])