var del = require("del");
var exec = require("child_process").exec;
var gulp = require("gulp");
var gulpFile = require("gulp-file");
var gutil = require("gulp-util");
var nodeExternals = require("webpack-node-externals");
var runSequence = require("run-sequence");
var webpack = require("webpack");



var isWin = /^win/.test(process.platform);

function webpackCallBack(taskName, gulpDone) {
  return function(err, stats) {
    if (err) throw new gutil.PluginError(taskName, err);
    gutil.log("[" + taskName + "]", stats.toString());
    gulpDone();
  }
}

gulp.task("compile", function(cb) {
  var executable = isWin ? "node_modules\\.bin\\ngc.cmd" : "./node_modules/.bin/ngc";
  exec(`${executable} -p ./tsconfig-aot.json`, (e) => {
    if (e) console.log(e);
    del("./dist/waste");
    cb();
  }).stdout.on("data", function(data) { console.log(data); });
});

gulp.task("bundle", function(cb) {
  function ngExternal(ns) {
    var ng2Ns = "@angular/" + ns;
    return {root: ["ng", ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns};
  }

  webpack(
      {
        entry: "./dist/index.js",
        output: {filename: "dist/bundles/ng2-completer.js", library: "ng2-completer", libraryTarget: "umd"},
        devtool: "source-map",
        externals: // [nodeExternals()]
        {
          "@angular/core": ngExternal("core"),
          "@angular/common": ngExternal("common"),
          "@angular/forms": ngExternal("forms"),
          "@angular/http": ngExternal("http"),
          "rxjs/Rx": {root: "Rx", commonjs: "rxjs/Rx", commonjs2: "rxjs/Rx", amd: "rxjs/Rx"},
          "rxjs/Observable": {root: "Rx", commonjs: "rxjs/Observable", commonjs2: "rxjs/Observable", amd: "rxjs/Observable"},
          "rxjs/Subject": {root: "Subject", commonjs: "rxjs/Subject", commonjs2: "rxjs/Subject", amd: "rxjs/Subject"},
          "rxjs/add/operator/let": {
            root: ["Rx", "Observable", "prototype"],
            commonjs: "rxjs/add/operator/let",
            commonjs2: "rxjs/add/operator/let",
            amd: "rxjs/add/operator/let"
          }
        }
      },
      webpackCallBack("webpack", cb));
});

gulp.task("npm", function() {
  var pkgJson = require("./package.json");
  var targetPkgJson = {};
  var fieldsToCopy = ["version", "description", "keywords", "author", "repository", "license", "bugs", "homepage"];

  targetPkgJson["name"] = "ng2-completer";

  fieldsToCopy.forEach(function(field) { targetPkgJson[field] = pkgJson[field]; });

  targetPkgJson["main"] = "bundles/ng2-completer.js";
  targetPkgJson["module"] = "index.js";
  targetPkgJson["typings"] = "index.d.ts";

  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach(function(dependency) {
    targetPkgJson.peerDependencies[dependency] = "^" + pkgJson.dependencies[dependency];
  });

  return gulp.src("README.md")
      .pipe(gulpFile("package.json", JSON.stringify(targetPkgJson, null, 2)))
      .pipe(gulp.dest("dist"));
});


gulp.task("build", function(done) {
  runSequence("compile", "bundle", "npm", done);
});
