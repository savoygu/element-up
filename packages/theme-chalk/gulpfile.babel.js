import { series, src, dest } from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssmin from 'gulp-cssmin'

function compile () {
  return src('src/*.scss')
    .pipe(sass.sync({
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('lib'))
}

function copyfont () {
  return src('src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('lib/fonts'))
}

exports.build = series(compile, copyfont)
