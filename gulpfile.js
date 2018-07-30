//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

//定义css、js源文件路径，替换文件版本的jsp路径，及替换成功后的存放路径
var cssSrc = '../static/s/css/**/**/*.css',
    jsSrc = '../static/s/js/**/**/*.js',
    jspSrc = '../ydc_project/ydc_web/src/main/webapp/WEB-INF/view/**/**/*.jsp',
    jspSaveSrc = '../ydc_project/ydc_web/src/main/webapp/WEB-INF/view'

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function() {
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function() {
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

//jsp替换css、js文件版本
gulp.task('revJsp', function() {
    return gulp.src(['rev/**/**/*.json', jspSrc])
        .pipe(revCollector())
        .pipe(gulp.dest(jspSaveSrc));
});

//监控文件变化
gulp.task('watch', function() {
    gulp.watch([cssSrc, jsSrc], ['dev']);
});

//开发构建
gulp.task('dev', function(cb) {
    runSequence(['revCss'], ['revJs'], ['revJsp'], ['watch'], cb);
});