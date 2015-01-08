var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    imagemin = require("gulp-imagemin"),
    runSequence = require("run-sequence");

gulp.task("uglify", function() {
    return gulp.src(__dirname + "/src/js/piwik-app.js")
        .pipe(uglify())
        .pipe(gulp.dest(__dirname + "/public/javascripts"));
});

gulp.task("image-min", function() {
    return gulp.src(__dirname + "/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest(__dirname + "/public/images"));
});

gulp.task("hint:fail", function() {
    return gulp.src(__dirname + "/src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail"))
});

gulp.task("hint", function() {
    return gulp.src(__dirname + "/src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("watch", function() {
    gulp.watch(__dirname + "/src/js/**/*.js", ["hint", "uglify"]);
    gulp.watch(__dirname + "/src/img/**/*.js", ["image-min"]);
});

gulp.task("test", ["hint:fail"]);

gulp.task("build", function() {
    return runSequence("test", ["image-min", "uglify"]);
});