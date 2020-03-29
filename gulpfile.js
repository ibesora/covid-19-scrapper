// @flow
const gulp = require("gulp");
const flowRemoveTypes = require("gulp-flow-remove-types");
const babel = require("gulp-babel");

gulp.task("build", () => {

	return gulp.src("./src/**/*.js")
		.pipe(flowRemoveTypes({pretty: true}))
		.pipe(babel({plugins: ["babel-plugin-unassert"]}))
		.pipe(gulp.dest("./dist/"));

});

gulp.task("move", () => {

	return gulp.src("./src/**/*.json")
		.pipe(gulp.dest("./dist/"));

})
;
