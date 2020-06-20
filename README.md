# Gulp Frontend project assembly

This is a ready-made Gulp assembly that you can use to develop your frontend projects.

***

## Navigation

* <a href="#installation">Installation<a>
* <a href="#available_functions">Available functions<a>
* <a href="#settings">Settings<a>
  * <a href="#preprocessors">Preprocessors</a>
  * <a href="#folders_and_files">Folders and files</a>
  * <a href="#images_settings">Images settings</a>
  * <a href="#webp_settings">WEBP settings</a>
    * <a href="#webp_in_html">Webp in html</a>
    * <a href="#webp-in-css">Webp in CSS</a>
    * <a href="#js-fun-webp">JS functino for webp</a>
  * <a href="#font-settings">Font settings</a>
  * <a href="#file-include-settings">File include settings</a>
* <a href="#remarks">Important remarks</a>
* <a href="#contacts">Contacts</a>
***

<h2 id="installatio">Installation</h2>

To start with you must have installed Node.js, you can download the latest version at the official website <a href="https://nodejs.org/en/download/">Node.js</a>

Then using the windows command line or a terminal in Mac OS, go to the project folder where are the files, gulpfile.js and package.json and type the command:

    $ npm i

To start the assembly you need to enter the command:

    $ gulp

Once you start the assembly with the gulp command, the page will open automatically in your browser, and every time you change the files (less, scss, js, html), the browser will also update the page automatically.

***

<h2 id="available_functions">Available functions and what each function does<h2>
<details>
<summary><b>File include</b></summary>
<br>
File include(gulp-file-include) is very useful function especially for html files, now you can split html page into separate files and include them to the desired place using the function @@include('file-name.html'). This is very convenient when you have repetitive code on your page, such as menu and footer.

If you have 10 pages and need to change something in the menu, you can do it in one place and save much time.
You can also use this function in javascript files.
</details>

<details>
<summary><b>Less and sass compilers</b></summary>
<br>
You can choose which preprocessor to work with, using the settings object
</details>

<details>
<summary><b>CSS autoprefixer</b></summary>
<br>
If you use new css properties and want your site to work correctly in old browsers, this function will help you by adding auto prefixes automatically. For example, you add <b><em>display: flex;</em></b> and at the output you get<br>
<b><em>display: flex;<br>
display: -webkit-box;<br>
display: -ms-flexbox;</em></b>
</details>
<details>
<summary><b>Group CSS media queries</b></summary>
<br>
Now you can write media queries anywhere in your CSS, SCSS or LESS file, the plugin will group your code and put it at the end of the file, even if you make two identical media queries, the plugin will make one and group your CSS code in order.<br>

But the most important thing for which I like this plugin, I will show you an example below.<br>

You write this code:

```scss  /* less or css */
.your_class {
  width: 500px;
  height: 200px;
  background: red;

  @media (max-width: 768px) {
    width: 300px; //It's important, here you write properties without selectors.
  }
  p {
    font-size: 20px; //It's important, here you write properties without selectors.

    @media (max-width: 768px) {
    font-size: 16px;
    }
  }
}
```
You get this result on the way out.

```scss  /* less or css */
.your_class {
  width: 500px;
  height: 200px;
  background: red;
}

.your_class p {
  font-size: 20px;
}

@media (max-width: 768px) {
  
  .your_class {
    width: 300px;
  }

  .your_class p {
    font-size: 16px;
  }
}
```
That is all properties in one selector for all screens you can write in one place and the plugin will arrange the code as 
so needed
</details>

<details>
<summary><b>CSS minification</b></summary>
<br>
It's simple and logical, this plugin minifies your CSS file by removing all spaces and blank lines, thus reducing the file size, for quick page loading.
</details>

<details>
<summary><b>Babel JS</b></summary>
<br>
There are different versions of Java script but newer JS versions are not supported in older browsers. You can write code using the syntax of newer versions, for example ES6, and babel outputs JS code ES5 which works in most browsers.
</details>

<details>
<summary><b>JS minification</b></summary>
<br>
It just like the CSS minifier, this plugin optimizes the js code for faster page loading
</details>

<details>
<summary><b>Image min</b></summary>
<br>
This plugin compresses images without loss of quality, thus optimizing them for faster page loading
</details>

<details>
<summary><b>Image WEBP</b></summary>
<br>
Webp is a modern picture format for web pages they are more optimal for fast site work.
All you need to do is add .png and .jpeg pictures and gulp will do everything for you, in the output except .png and .jpeg you will get pictures in webp format.<br>

But not all browsers support webp format and that everything works correctly need more additional settings, more details about this in the settings section.<br>
</details>

<details>
<summary><b>Fonts settings</b></summary>
<br>
The modern site building is not possible without including external fonts, the most popular format is .ttf, but not all browsers support this format, so I installed and configured special plugins that convert . ttf in other formats, such as woff, woff2, otf, svg.<br>

Even more, I did it so the program will insert the right CSS code to include them, all you need to do is insert the right fonts in ttf format into the "fonts" folder and gulp will do everything for you.
</details>

***

<h2 id="settings">Settings</h2>

<h3 id="preprocessors">1. Preprocessors</h3>
You can choose what preprocessor use.<br>
To do this, at the beginning of the gulpfile.js file you need to write a string value 'less' or 'scss' in the settings -preprocesor object.<br>

If you delete the settings object or the preprocessor value is different then nothing will work.

```js
const settings = {
  preprocesor: 'scss', // less or scss (default less)
}
```

*******

<h3 id="folders_and_files">2. Folders and files</h3>

There are two main folders, the folder with the source files, that is, the folder where we work and save the work files.<br>

The second folder with the ready project.<br>
If you want to change the names of these folders you can do so in these variables:
```js
let source_folder = '#src';
let project_folder = 'dist';
```
You can customize the assembly in more detail in the "path" object.<br>
If you want to change the folder names inside source or project folders, you must also change these names in the "path" object.

Files with the prefix _ (_file-name.html) are files that are not copied to the ready project.
For example, we have a part of the html file _header.html that includes to the index.html, but in the ready project we do not need _header.html, we just need the index.html. 

If there are files in the work folder that should not be copied to the folder of the ready project, set the prefix _ at the begin of file name.

The _ prefixes is only used in html and js files.

***

<h3 id="images_settings">3. Images settings</h3>

You need to insert the images into the '#src/img/src' folder so that the images are optimized and fall into the '#src/img/dist' folder after that they are copied to the folder of the final project, this is done so that every time you start a gulp assembly, the images are not re-optimized but only optimized for new ones.

***

<h3 id="webp_settings">4. WEBP settings</h3>

<h4 id="webp_in_html">Webp in html</h4>
As I wrote above, webp is a modern picture format for web pages that allows web pages to load faster.

All you need to do is add .png and .jpeg pictures and gulp will do everything for you, in the output except .png and .jpeg you will get pictures in webp format.

But as we know that not all browsers work with webp format, so in the assembly there is a special plugin that inserts into the html file special picture tags allowing the browser to choose the format of the picture, if the browser works with webp then loaded picture webp format, if the browser does not support webp then load the usual picture.<br>

Example html code:

```html
  <picture>
    <source srcset="img/picture-name.webp" type="image/webp">
    <img src="img/picture-name.png" alt="img">
  </picture>

  <picture>
    <source srcset="img/picture-name-2.webp" type="image/webp">
    <img src="img/picture-name-2.jpg" alt="img">
  </picture>
```

<h4 id="webp-in-css">Webp in CSS</h4>

There is also a webp-css plugin that adds css styles for webp to the style.css file or another style file that will be the main.<br>

But as it was written above, not all browsers work with webp and for what webp styles do not load for browsers that do not work with webp format there is a special JS function that determines whether the user's browser works with webp or not. You can find this function below or in _lib.js file.<br>

In practice it works this way, you write some style for a regular picture (jpg or png):
```css
.act > div { 
  background-image: url("../img/author_1.png");
}
```

and as a result you get it:

```css
.act > div { 
  background-image: url("../img/author_1.png");
}

.webp .act > div { 
  background-image: url(../img/author_1.webp); 
}
```

That is, this js function adds a body tag class .webp and styles works, if the browser supports webp, if the browser does not support the format wepb, class .webp is not added and the browser ignores these styles.

<h4 id="js-fun-webp">JS functino for webp</h4>

```js
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
```

<h3 id="font-settings">5. Font settings</h3>

The most popular font format is .ttf, but not all browsers support this format; there are several popular font formats that cover most browsers (woff, woff2, eot, svg, ttf).<br>

The most popular font format is .ttf, but not all browsers support this format, there are several popular font formats that cover most browsers (woff, woff2, eot, svg, ttf).<br>

All you have to do is insert the font files in ttf format into the '#src/fonts' folder then the assembly will do everything else for you. The plugins will convert the font files to the necessary formats and connect the fonts in the original CSS file.<br>

How does it work?
First you need two files if you work with less preprocessor functions.less and fonts.less or functions.scss fonts.scss if you work with scss.

In the functions file you add this mixin:

-for less file
```less
.font(@font_name, @file_name) {
  @font-face {
  font-family: @font_name;
  font-display: swap;
  src: url("../fonts/@{file_name}.eot");
  src: url("../fonts/@{file_name}.eot") format("embedded-opentype")
  url("../fonts/@{file_name}.woff") format("woff"), 
  url("../fonts/@{file_name}.woff2") format("woff2"),
  url("../fonts/@{file_name}.ttf") format("truetype"),
  url("../fonts/@{file_name}.svg##{$font_name}") format("svg");
  }
}
```

-for scss file
```scss
@mixin font($font_name, $file_name) {
  @font-face {
    font-family: $font_name;
    font-display: swap;
    src: url("../fonts/#{$file_name}.eot");
    src: url("../fonts/#{$file_name}.eot") format("embedded-opentype"),
    url("../fonts/#{$file_name}.woff") format("woff"),
    url("../fonts/#{$file_name}.woff2") format("woff2"),
    url("../fonts/#{$file_name}.ttf") format("truetype"),
    url("../fonts/#{$file_name}.svg##{$font_name}") format("svg");
  }
}
```

Second, you need a JS function that will include all fonts in all the above formats into the fonts file, this function is in gulpfile.js called <b>'fontsStyle'.</b><br>

You can name the file functions as you like, it will not affect anything, but if you want to change the name of the fonts file, you will also need to change its name in the <b>'fontsStyle'.</b> function, but it is better not to change the name of this file.<br>

It is important not to manually write any styles to the fonts file, because this file is overwritten automatically after each gulp build start, as a result, the styles you have written in this file will be deleted.<br>

It is also important to include the fonts file after the functions file.

```less
  @import  "functions";
  @import  "fonts";
  @import  "main";
```

<h3 id="file-include-settings">6. File include settings

Function @@include( ) is used only in html and JS files, this function should not be used in scss and less files, because scss and less have their own function @import('style') and file extension is not required, @import('style') and @import('style.less') both ways will work.

Examples of include:

html

```html
@@include('_header.html');
@@include('_content.html');
@@include('_sidebar.html');
@@include('_footer.html');
```

js

```js
@@include('_lib.js');
@@include('_main.js');
```
scss or less

```less
@import('fonts');
@import('main');
```

***

<h2 id="remarks">Important remarks</h2>

1. When you run the assembly with the gulp command, then the web page in your browser may be loaded long, it depends on the size of the project, the more code, images and fonts you have, the longer the first load will be.
But I underline this only the first load, next after every change in the code you save, adding pictures, pages will be updated immediately.

2. It may also be that after starting the assembly, a page will open in the browser, but the page is not loaded, then you can reload the page manually. Usually, after a few manual reloads, then the automatic starts working.

3. It can be so, that you haven't changed anything in gulpfile.js, you haven't changed the names of working files and folders, and the assembly gives you an error. In that situation, you need to restart the assembly, maybe even several times.

4. After starting the assembly, the gulp command completely removes the "dist" folder and then recreates it with all the necessary files. But when the assembly gives out an error during the start of the assembly, the folder "dist" may not be created yet, experienced developers know it, but it often scares newcomers. 

<h2 id="contacts">Contacts</h2>

<h5>Email: </h5>myuspehcom@gmail.com
<h5>Web site: </h5><a href="https://ixamp.com">ixamp.com</a>
<h5>Social networks: </h5>
    <a href="https://www.linkedin.com/in/rohozianskyi/" target="_blank">Linkedin</a><br>
    <a href="https://www.facebook.com/ttpnb">Facebook</a><br>
    <a href="https://www.pinterest.com/ixampcom/">Pinterest</a><br>
    <a href="https://www.instagram.com/romanrogozianskij">Instagram</a><br>
    <a href="https://t.me/ixampcom">Telegram</a><br>
