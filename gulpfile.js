var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    imagemin = require("gulp-imagemin"),
    insert = require("gulp-file-insert"),
    runSequence = require("run-sequence"),
    karma = require("gulp-karma"),
    testFiles = [
        "src/js/source.js",
        "test/unit/**/*.spec.js"
    ];

gulp.task("uglify", function() {
    return gulp.src(__dirname + "/src/js/piwik.js")
        .pipe(insert({
            "/* source.js */": "src/js/source.js"
        }))
        .pipe(uglify())
        .pipe(gulp.dest(__dirname + "/public/javascripts"));
});

gulp.task("image-min", function() {
    return gulp.src(__dirname + "/src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest(__dirname + "/public/images"));
});

gulp.task("hint:fail", function() {
    return gulp.src(__dirname + "/src/js/source.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail"))
});

gulp.task("hint", function() {
    return gulp.src(__dirname + "/src/source.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("test", ["hint:fail"], function() {

    return gulp.src(testFiles)
        .pipe(karma({
            configFile: "karma.local.conf.js",
            action: "run"
        }))
        .on("error", function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });

});

gulp.task("build", function() {
    return runSequence("test", ["image-min", "uglify"]);
});

gulp.task("default", function() {
    gulp.watch(__dirname + "/src/js/**/*.js", ["hint", "uglify"]);
    gulp.watch(__dirname + "/src/img/**/*.js", ["image-min"]);
    gulp.src(testFiles)
        .pipe(karma({
            configFile: "karma.local.conf.js",
            action: "watch"
        }));
});