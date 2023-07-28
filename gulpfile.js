import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sass_package from "sass";

const sass = gulpSass(sass_package);

function compile() {
  return gulp.src("src/scss/*.scss").pipe(sass()).pipe(gulp.dest("src/css"));
}

function watchScss() {
  gulp.watch(["src/scss/*.scss"], compile);
}

export default gulp.series(compile, watchScss);
