let gulp = require("gulp");
let jspm = require("jspm");
let fs = require("fs");
var git = require('git-rev')

let jade = require("gulp-jade");
let clean = require("gulp-clean");
let pkg = require("./package.json")

let production = process.argv.indexOf("--production") !== -1 || process.argv.indexOf("-p") !== -1

gulp.task("clean", function(done) {
  return gulp.src(["build/", "public/release.json"], {read: false})
    .pipe(clean());
})

gulp.task("relinfo", function(done) {
  git.short(function(commit) {
    git.branch(function(branch) {
      git.tag(function(tag) {

        let isRelease = tag.indexOf("v") === "0";
        let relinfo = {
          codename: pkg.codename,
          version: pkg.version,
          commit: commit,
          branch: branch,
          deps: pkg.jspm.dependencies,
          jspm: pkg.dependencies.jspm
        }
        if (isRelease) relinfo.tag = tag;
        fs.writeFile("./public/release.json", JSON.stringify(relinfo), function(err) {
          done(err);
        })
      });
    });
  });
})

gulp.task("jade", function() {
  return gulp.src("jade/*.jade")
    .pipe(jade({
      locals: {
        prod: true
      },
      pretty: !production
    }))
    .pipe(gulp.dest("build/"));
})

gulp.task("jspm", ["relinfo"], function() {
  jspm.setPackagePath(__dirname);
  return jspm.bundleSFX("main", "build/sge.js", {
    minify: production,
  })
})

gulp.task("default", ["jspm", "jade"], () => {
  console.log("Thank you for flying Solace!")
});
