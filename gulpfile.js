"use strict";

const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify-es").default;
const connect = require("gulp-connect");

// CLEAN

gulp.task("clean", () => {
  return del(["dist", "serve"]);
});

// BUILD

gulp.task("build:style", () => {
  return gulp.src("src/asset/**/*.scss")
    // Compile SASS files
    .pipe(sass({
      outputStyle: "nested",
      precision: 10,
      includePaths: ["."],
      onError: console.error.bind(console, "Sass error:"),
    }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest("dist/asset"));
});

gulp.task("build:script", () => {
  return gulp.src("src/asset/**/*.js")
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest("dist/asset"));
});

gulp.task("build:html", () => {
  return gulp.src(["src/**/*.html"])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("build:asset", () => {
  return gulp.src(["src/asset/*/**/*"]).pipe(gulp.dest("dist/asset/"));
});

gulp.task("build:node", () => {
  return gulp.src([
    "node_modules/bootstrap.native/dist/bootstrap-native.js",
  ])
    .pipe(uglify())
    .pipe(gulp.dest("dist/asset/"));
});

gulp.task("build", gulp.series(
  "clean",
  "build:style",
  "build:script",
  "build:html",
  "build:asset",
  "build:node",
));

// SERVE

gulp.task("serve:html", () => {
  return gulp.src(["src/**/*.html"]).pipe(gulp.dest("serve"));
});

gulp.task("serve:style", () => {
  return gulp.src("src/asset/style.scss")
    .pipe(sass({
      outputStyle: "nested",
      precision: 10,
      includePaths: ["."],
      onError: console.error.bind(console, "Sass error:"),
    }))
    .pipe(gulp.dest("serve/asset/"));
});

gulp.task("serve:asset", () => {
  return gulp.src(["src/asset/*/**/*"]).pipe(gulp.dest("serve/asset/"));
});

gulp.task("serve:node", () => {
  return gulp.src([
    "node_modules/bootstrap.native/dist/bootstrap-native.js",
  ]).pipe(gulp.dest("serve/asset/"));
});

gulp.task("serve:reload", () => {
  return gulp.src("serve").pipe(connect.reload());
});

gulp.task("serve:watch", async () => {
  return gulp.watch("src/**/*", gulp.series(
    "clean",
    "serve:html",
    "serve:node",
    "serve:style",
    "serve:asset",
    "serve:reload",
  ));
});

gulp.task("serve:connect", async () => {
  connect.server({
    port: 4000,
    root: "serve",
    livereload: true,
  });
});

gulp.task("serve", gulp.series(
  "clean",
  "serve:html",
  "serve:asset",
  "serve:node",
  "serve:style",
  "serve:reload",
  "serve:connect",
  "serve:watch",
));

// DEFAULT

gulp.task("default", async () => {
  console.log("Check README.md to see development commands.");
});
