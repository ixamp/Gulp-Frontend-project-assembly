const settings = {
  preprocesor: 'less', // less or scss (default less)
}

let source_folder = '#src';
let project_folder = 'dist';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/'
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    less: source_folder + '/less/style.less',
    scss: source_folder + '/scss/style.scss',
    js: [source_folder + '/js/**/*.js', '!' + source_folder + '/js/**/_*.js'],
    imgSrc: source_folder + '/img/src/**/*{.JPG,.jpg,.PNG,.png,.gif,.svg,.webp,.ico}',
    img: source_folder + '/img/dist/**/*{.JPG,.jpg,.PNG,.png,.gif,.svg,.webp,.ico}',
    imgDist: source_folder + '/img/dist/',
    fonts: source_folder + '/fonts/**/*.ttf'
  },
  watch: {
    html: source_folder + '/**/*.html',
    less: source_folder + '/less/**/*.less',
    scss: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/dist/**/*{.JPG,.jpg,.PNG,.png,.gif,.GIF,.svg,.SVG,.webp,.WEBP,.ico,.ICO}'
  },
  clean: './' + project_folder + '/'
}

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browser_sync = require('browser-sync').create(),
  file_include = require('gulp-file-include'),
  del = require('del'),
  gulp_less = require('gulp-less'),
  gulp_scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media_queries = require('gulp-group-css-media-queries'),
  fs = require('fs'),
  clean_css = require('gulp-clean-css'),
  gulp_rename = require('gulp-rename'),
  gulp_babel = require('gulp-babel'),
  uglify_js = require('gulp-uglify-es').default,
  image_min = require('gulp-imagemin'),
  gulp_webp = require('gulp-webp'),
  webp_html = require('gulp-webp-in-html'),
  webp_css = require('gulp-webpcss'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  ttf2eot = require('gulp-ttf2eot'),
  newer = require('gulp-newer')


function browserSync(done) {
  browser_sync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  });
  done();
}

function html() {
  return src(path.src.html)
    .pipe(webp_html())
    .pipe(file_include())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream())
}

function css() {
  let preprocesorType;
  if (settings.preprocesor == 'scss') {
    preprocesorType = src(path.src.scss).pipe(gulp_scss({ outputStyle: 'expanded' }));

  } else if (settings.preprocesor == 'less') {
    preprocesorType = src(path.src.less).pipe(gulp_less({ outputStyle: 'expanded' }));
  }
  return preprocesorType
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
      grid: true
    }))
    .pipe(group_media_queries())
    .pipe(webp_css())
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(gulp_rename({
      extname: '.min.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(file_include())
    .pipe(gulp_babel({
      presets: ['@babel/env']
    }))
    .pipe(dest(path.build.js))
    .pipe(uglify_js())
    .pipe(gulp_rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream())
}

function images() {
  src(path.src.imgSrc)
    .pipe(newer(path.src.imgDist))
    .pipe(gulp_webp({
      quality: 70
    }))
    .pipe(dest(path.src.imgDist))
    .pipe(src(path.src.imgSrc))
    .pipe(image_min({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.src.imgDist))
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream())
}


function fonts() {
  src(path.src.fonts)
    .pipe(dest(path.build.fonts));
  src(path.src.fonts)
    .pipe(ttf2eot())
    .pipe(dest(path.build.fonts));
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

function clean() {
  return del(path.clean)
}

function watchFiles() {
  if (settings.preprocesor == 'scss') {
    gulp.watch([path.watch.scss], css);
  } else if (settings.preprocesor == 'less') {
    gulp.watch([path.watch.less], css);
  }

  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.img], images);

}


function fontsStyle() {
  let preprocesor_dir;
  let fonts_template;
  if (settings.preprocesor === 'scss') {
    preprocesor_dir = source_folder + '/scss/fonts.scss';
    fonts_template = '@include font("';
  } else if (settings.preprocesor === 'less') {
    preprocesor_dir = source_folder + '/less/fonts.less';
    fonts_template = '.font("';
  }
  // let file_content = fs.readFileSync(preprocesor_dir);
  // if (file_content) {
  fs.writeFile(preprocesor_dir, '', cb);
  return fs.readdir(path.build.fonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
        let fontname = items[i].split('.');
        fontname = fontname[0];
        if (c_fontname != fontname) {
          fs.appendFile(preprocesor_dir, fonts_template + fontname + '", "' + fontname + '");\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  })
  // }
}

function cb() { }

let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;