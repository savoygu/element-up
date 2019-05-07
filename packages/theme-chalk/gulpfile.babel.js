import { series, src, dest } from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssmin from 'gulp-cssmin'
import moduleImporter from 'sass-module-importer'

function compile () {
  return src('src/*.scss')
    .pipe(sass({
      importer: moduleImporter()
    }))
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('lib'))
}

function copyfontFromElement () {
  return src('../../node_modules/element-ui/packages/theme-chalk/src/fonts/**')
    .pipe(dest('src/fonts'))
}

function copyfont () {
  return src('src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('lib/fonts'))
}

exports.build = series(copyfontFromElement, compile, copyfont)
