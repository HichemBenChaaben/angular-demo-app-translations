// Gulp is going to watch html files and update the translations
var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');

gulp.task('pot', function() {
    return gulp.src(['index*.html'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function() {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            format: 'json'
        }))
        .pipe(gulp.dest('dist/translations/'));
});
gulp.task('watch', function() {
    gulp.watch('po/**/*.po', ['pot', 'translations']);
    gulp.watch('index.html', ['translations']);
});

gulp.task('default', ['pot', 'translations', 'watch']);
