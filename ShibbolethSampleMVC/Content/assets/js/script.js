// @codekit-prepend "browser-check.js";

// (function($) {
//   if(!is_okbrowser()){
//     $('<div class="notification-bar__message"><p><img draggable="false" class="emoji" alt="⚠️" src="https://s.w.org/images/core/emoji/12.0.0-1/svg/26a0.svg"> Warning: <a href="https://web.colostate.edu/browsers">Your web browser may be out of date,</a> and might be prevented from using this service in the future.</p></div>').insertBefore('#mainheader');
//   }    
// })( jQuery );

//// enterDom Function
(function (a) { 'use strict'; function b(a, b) { e.push({ selector: a, fn: b }), d || (d = new g(c), d.observe(f.documentElement, { childList: !0, subtree: !0 })), c() } function c() { for (var a, b, c = 0, d = e.length; c < d; c++) { a = e[c], b = f.querySelectorAll(a.selector); for (var g, h = 0, k = b.length; h < k; h++)g = b[h], g.enterDom || (g.enterDom = !0, a.fn.call(g, g)) } } var d, e = [], f = a.document, g = a.MutationObserver || a.WebKitMutationObserver; a.enterDom = b })(this);

//simple mobile device check
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i) }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i) }, Windows: function () { return navigator.userAgent.match(/IEMobile/i) }, any: function () { return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() } };

//setting dynamic script locations (hard code if using caching - edit, new additions possibly fix cache glitch, need to check).
var mainloc;
//mainloc = 'http://localhost.dev/wp/admissions/';
//mainloc = 'http://admissions.colostate.edu/wp-content/themes/admissions-2014/assets/js/';
//mainloc = 'http://localhost.dev/wp/admissions/wp-content/themes/admissions-2014/assets/js/';
//attempting to find relative location for ll calls

/*/
var scripts= document.getElementsByTagName('script');
var path= scripts[scripts.length-1].src.split('?')[0];  // remove any ?query
var mydir= path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path
mainloc = mydir;
//*/

//https://stanko.github.io/get-scrollbar-width-in-javascript/
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
//set/change css variable
var lowMotionPreference = matchMedia('(prefers-reduced-motion)');
// console.log("motion preference: " + lowMotionPreference.matches);
// function handleReduceMotionChanged() {
//     //document.getElementById('prmValue').innerText = lowMotionPreference.matches ? 'on' : 'no-preference or unsupported';
//     console.log("motion preference: " + lowMotionPreference.matches);
// }
// handleReduceMotionChanged(); // trigger this once on load to set up the initial value
// lowMotionPreference.addListener(handleReduceMotionChanged); // Note: https://webkit.org/b/168491



(function ($) {

  //things to do for reduced motion
  function onDocReadyReducedMotion() {
    if (!lowMotionPreference.matches) {
      return false;
    }
  }
  function onWindowLoadReducedMotion() {
    if (!lowMotionPreference.matches) {
      return false;
    }
  }

  //fixes for slick slider from Elementor
  function accessibleSliderAdjustments(el) {
    // console.log('motion pref:' + lowMotionPreference.matches);
    //if no motion preference, or not upported
    if (!lowMotionPreference.matches) {
      var $this = $(el);
      //if autoplay is set to true, add pause button
      if($this.slick('slickGetOption', 'autoplay') === true){
        $this.append("<button class='playpause play' title='Toggle autoplay'><i class='fa fa-pause'></i></button>");
        $this.find('.playpause').on('click', function () {
          if ($(this).hasClass('play')) {
            $this.slick('slickSetOption', 'autoplay', false).slick('slickPause');
            $(this).addClass("pause").removeClass("play").html("<i class='fa fa-play'></i>");
          } else {
            $this.slick('slickSetOption', 'autoplay', true).slick('slickPlay');
            $(this).addClass("play").removeClass("pause").html("<i class='fa fa-pause'></i>");
          }
        });
      }
    //if motion preference, turn off autoplay
    } else {
      $(el).each(function () {
        var $this = $(this);
        $this.slick('slickSetOption', 'autoplay', false).slick('slickPause');
      });
    }

  }
  enterDom(".slick-slider", function(el) {
    accessibleSliderAdjustments(el);
  });

  //elementor image box accessibility enhancement
  $('.elementor-widget-image-box').each(function(){
    var $this = $(this);
    $img = $this.find('a').has('img');
    $title = $this.find('.elementor-image-box-title > a');
    if($($title).length > 0 && $($img).length > 0){
      $img.attr('role','presentation').attr('tabindex','-1');
    }
  });

  //file upload polyfil Accessibility
  $('.moxie-shim').attr('aria-hidden','hidden');
  
  //trigger resize to clean up some things
  $(window).load(function () {
    $(this).trigger('resize');
  })
})(jQuery); // End of use strict

var scriptFilename = 'script.js'; // don't forget to set the filename
var scriptUrl = (function () {
  if (document.currentScript) { // support defer & async (mozilla only)
    return document.currentScript.src;
  } else {
    var ls, s;
    var getSrc = function (ls, attr) {
      var i, l = ls.length, nf, s;
      for (i = 0; i < l; i++) {
        s = null;
        if (ls[i].getAttribute.length !== undefined) {
          s = ls[i].getAttribute(attr, 2);
        }
        if (!s) continue; // tag with no src
        nf = s;
        nf = nf.split('?')[0].split('/').pop(); // get script filename
        if (nf === scriptFilename) {
          return s;
        }
      }
    };
    ls = document.getElementsByTagName('script');
    s = getSrc(ls, 'src');
    if (!s) { // search reference of script loaded by jQuery.getScript() in meta[name=srcipt][content=url]
      ls = document.getElementsByTagName('meta');
      s = getSrc(ls, 'content');
    }
    if (s) return s;
  }
  return '';
})();

var scriptPath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/')) + "/";
mainloc = scriptPath;


//function to get viewport width/height (to match media queries) rather than the window width/height provided by javascript
var getwinsize = function () { //nb: re-creates itself.
  var f = '';
  // get window size
  if (typeof (window.innerWidth) == 'number') { //Non-IE
    f = 'x:window.innerWidth,y:window.innerHeight';
  } else if (document.documentElement && document.documentElement.clientWidth) { //IE 6+ in 'standards compliant mode'
    f = 'x:document.documentElement.clientWidth,y:document.documentElement.clientHeight';
  } else if (document.body && document.body.clientWidth) { //IE 4 compatible
    f = 'x:document.body.clientWidth,y:document.body.clientHeight';
  } else if (document.width) { //doc version
    f = 'x:document.width,y:document.height';
  }
  // get scroll distance
  if (typeof (document.scrollTop) == 'number') {
    f += ',yy:document.scrollTop,xx:document.scrollLeft';
  } else if (typeof (document.body.scrollTop) == 'number') {
    f += ',yy:document.body.scrollTop,xx:document.body.scrollLeft';
  } else if (typeof (document.documentElement.scrollTopt) == 'number') {
    f += ',yy:document.documentElement.scrollTop,xx:document.documentElement.scrollLeft';
  } else if (typeof (window.pageYOffset) == 'number') {
    f += ',yy:window.pageYOffset,xx:window.pageXOffset';
  } else {
    f += ',yy=0,xx=0';
  }
  getwinsize = Function('return{' + f + '}');
  return (getwinsize());
}

var mScreen = "",
  mWidth,
  mXlarge = 1300,
  mLarge = 1230,
  mMedium = 1100,
  mSmall = 980,
  mTablet = 768,
  mPhone = 480,
  mSmallPhone = 320,
  mScrollWidth = 20;

function mediaQuery() {
  //console.log("size:"+getEmValue());
  var docsize = getwinsize();
  var w = docsize.x;
  //console.log("width:"+w + " | jqw:" + jQuery(window).width() );
  mWidth = w;
  //*/this is a test suite of queries
  if (w >= mXlarge) {
    //jQuery('body').css('background','red');
    mScreen = mXlarge;
  }
  if (w >= mLarge && w < mXlarge) {
    //jQuery('body').css('background','blue');
    mScreen = mLarge;
  }
  if (w >= mMedium && w < mLarge) {
    //jQuery('body').css('background','green');
    mScreen = mMedium;
  }
  if (w >= mSmall && w < mMedium) {
    //jQuery('body').css('background','pink');
    mScreen = mSmall;
  }
  if (w >= mTablet && w < mSmall) {
    //jQuery('body').css('background','orange');
    mScreen = mTablet;
  }
  if (w >= mPhone && w < mTablet) {
    //jQuery('body').css('background','silver');
    mScreen = mPhone;
  }
  if (w >= mSmallPhone && w < mPhone) {
    //jQuery('body').css('background','lime');
    mScreen = mSmallPhone;
  }
  //*/

  //adding or removing mobile classes
  if (w >= mTablet) {
    jQuery('body').removeClass('mobile');
  } else {
    jQuery('body').addClass('mobile');
  }

}

//resize scripts in single function to be called with timer
function windowSize() {
  mediaQuery();
}

//combined lazyload script
function ll(settings) {
  function lljs(callback) {
    LazyLoad.js(settings.js, function () {
      callback();
    });
  }
  function llcss(callback) {
    LazyLoad.css(settings.css, function () {
      callback();
    });
  }

  function llcallback() {
    if (settings.callback && typeof (settings.callback) === "function") {
      settings.callback();
    }
  }

  if (settings.js && settings.css) {
    lljs(function () {
      llcss(llcallback);
    });
  } else if (settings.js) {
    lljs(llcallback);
  } else if (settings.css) {
    llcss(llcallback);
  } else {
    console.log('error');
  }

}

//Keyboard nav friendly focus
////detects when keyboard nav starts
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
}
////detects when mouse clicking starts
function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
}
window.addEventListener('keydown', handleFirstTab);
//end Keyboard nav friendly focus

function masterSlider() {
  jQuery('.ms-layer').addClass('container');
  jQuery('.ms-view').addClass('white-stripes');

}

(function () {
  jQuery(document).ready(function () {
    windowSize();
    jQuery('html').removeClass('no-js');
    jQuery('span.btn-center').parent().addClass('btn-center');

    //hack fix for google maps called incorrectly
    jQuery("iframe[src^='http:\/\/www.google.com\/maps']").each(function () {
      var src = $(this).attr('src');
      src = src.replace('http://www.google.com/maps/', 'https://www.google.com/maps/');
      $(this).attr('src', src);
    });

  });
  jQuery(window).load(function () {
    jQuery('main').find('p, ul, ol, table').find('a:not([class])').addClass('fancy-link');
  });

  function sliderClean() {
    var $sliderImage = jQuery('img.slider-image');
    var h = $sliderImage.first().parent().height();
    $sliderImage.each(function () {
      $this = jQuery(this);
      var src = $this.attr('src');
      var bg = 'url(\'' + src + '\')';

      alert($this.attr('src'));
      //console.log('pre: '+$this.attr('src'));
      $this.wrap('<div class="image-wrap ls-l slider-image ls-preloaded" data-ls="offsetxin:0;offsetxout:0;" style="height:' + h + 'px !important; width:100% !important; background-image:' + bg + '; background-size:cover; background-position: 50%;"></div>');
      //console.log('post: '+$this.attr('src'));


      $this.css({ 'display': 'none' });

    });


  }

  jQuery(window).load(function () {
    //*/
    if (jQuery('.ls-wp-container').length) {
      setTimeout(function () {
        sliderClean()
      }, 200);

    };
    //*/
    //sliderClean()
  });

  // Full width breakout script
  var jQuerybreakoutitems = jQuery('.break');
  var innerItems = jQuery('.main').find('.break');
  function breakout(firstrun) {
    //console.log('length: ' + jQuerybreakoutitems.length);
    if (jQuerybreakoutitems.length == 0) {
      jQuerybreakoutitems = jQuery('.break');
    }

    //console.log('breaking running');
    var winwidth = jQuery(window).width();
    var itemmargin = parseInt(jQuerybreakoutitems.css('margin-right'));
    var sidebarWidth = jQuery('.sidebar').outerWidth();

    jQuerybreakoutitems.css({ "margin-left": 0, "margin-right": 0 });
    var itemwidth = innerItems.width();
    var ow = (winwidth - itemwidth) / 2;
    //console.log("m:" + itemmargin + " i:"+itemwidth +" w:" + winwidth + " t:"+jQuery(window).width());
    jQuerybreakoutitems.each(function (index) {
      //console.log('breaking: Item');
      var inContent = jQuery(this).parents().hasClass('main');
      var w = ow;
      if (!inContent) {
        w = (winwidth - jQuery(this).width()) / 2;
      }

      var s;

      //checks to see if the sidebar exists, and runs a different calculation
      if (jQuery('body').hasClass('mobile')) {
        //s = "0px";
        jQuery(this).css({ 'margin-right': '-15px', 'margin-left': '-15px', 'position': 'relative', 'left': '0' });
      } else {
        if ($('aside.sidebar').length && inContent) {
          if ($('.sidebar-left').length) {
            s = -(sidebarWidth / 2) + "px";
            jQuery(this).css({ 'margin-right': -w, 'margin-left': -w, 'position': 'relative', 'left': s });
          } else {
            s = sidebarWidth / 2 + "px";
            jQuery(this).css({ 'margin-right': -w, 'margin-left': -w, 'position': 'relative', 'left': s });
          }
        } else {
          jQuery(this).css({ 'margin-right': -w, 'margin-left': -w });
        }

      }

      //alert(s);
    });

    if (firstrun) {
      //console.log('breaking: First Run');
      setTimeout(function () {
        jQuerybreakoutitems.css({ 'visibility': 'visible' });
      }, 200);
    }
  }

  function matchWidth() {
    var width = jQuery('.entry-content').width();
    jQuery('.entry-content .break .matchwidth').css({ "width": width, "margin-left": "auto", "margin-right": "auto" });
  }

  jQuery(document).ready(function () {
    breakout(true);
    matchWidth();
  });
  jQuery(window).resize(function () {
    windowSize();
    breakout(false);
    matchWidth();
  });

  //social icons swap locations
  var screenPhone = 767;
  function mqPhone(mediaQueryList) {
    if (window.matchMedia("only screen and (max-width: " + screenPhone + "px)").matches) {
      if ($('.brandbar .social').length && $('.brandbar .socialholder').length) {
        swapItems('.brandbar .social', '.brandbar .socialholder');
        $('.brandbar .social').addClass('bottom');
      }
    } else {
      if ($('.brandbar .social.bottom').length && $('.brandbar .socialholder').length) {
        swapItems('.brandbar .social', '.brandbar .socialholder');
        $('.brandbar .social').removeClass('bottom');
      }
    }
  }

  widthPhoneCheck = window.matchMedia("only screen and (max-width: " + screenPhone + "px)"),
    widthPhoneCheck.addListener(mqPhone);
  window.addEventListener("DOMContentLoaded", mqPhone, false);

  function swapItems(item1, item2) {
    item1 = $(item1);
    item2 = $(item2);
    i1 = item1.clone();
    i2 = item2.clone();

    item1.replaceWith(i2);
    item2.replaceWith(i1);
  }

}).call(this);

//new nav
(function ($) { // Begin jQuery

  var tabkey = 9;
  //usage: if (e.keyCode === tabkey)

  var $body = $('body');
  var $html = $('html');
  var $nav = $('.nav-component');
  var $navlist = $('nav ul').first();
  var $navtoggle = $('.nav-toggle');

  $nav.each(function () {
    var navType = $(this).data("navType");
    if (navType) {
      $(this).addClass(navType);
      $body.addClass(navType);
    }
  });

  $(window).resize(function () {
    $navlist.addClass('inactive');
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function () {
      //console.log('Resized finished.');
      $navlist.removeClass('inactive');
    }, 250);
  });

  //detect if user is touching...
  window.addEventListener('touchstart', function onFirstTouch() {
    // we could use a class
    document.body.classList.add('touching');
    // or set some global variable
    window.touching = true;
    touch_setup();
    // we only need to know once that a human touched the screen, so we can stop listening now
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);
  function touch_setup() {
    //nav.li.a[valid href]. append to first child menu with non-mobile class?
  }
  $('nav a[href][href!="#"][href!=""]:not([href^=" "]) + ul').prev().addClass('doublelink');
  $('nav a[href][href!="#"][href!=""]:not([href^=" "]) + ul').each(function () {
    var a = "<li class='generated-link'><a href='" + $(this).prev().attr('href') + "'>" + $(this).prev().text() + "</a></li>";
    $(this).prepend(a);
  })

  //If a link has a dropdown, add sub menu toggle.
  var $dropdown = $('nav ul li a:not(:only-child)');
  var $dropdownListItem = $dropdown.parent();

  $dropdownListItem.on('mouseenter', function (e) {
    var $child = $(this).find(">a:not(:only-child)");
    $child.trigger('click');
  });
  $dropdownListItem.on('mouseleave', function (e) {
    var $child = $(this).find(">a:not(:only-child)");
    if ($child.siblings('.nav-dropdown').hasClass('active')) {
      $child.trigger('click');
    }
  });
  $dropdown.on('click', function (e) {
    //checks to see if we are in mobile view - if so, treat dropdown links with links as normal
    //if(! $(this).closest('nav > ul ').hasClass('active') ){
    if (!$('body').hasClass('mobile')) {
      //prevents normal link from firing
      console.log("click: " + e);
      e.preventDefault();
      e.stopPropagation();
      //adds active class
      $(this).siblings('.nav-dropdown').toggleClass('active');
      //removes active from other menus
      $('.nav-dropdown').not($(this).siblings()).removeClass('active');
    }
    // Close one dropdown when selecting another
  });
  //Clicking away from dropdown will remove the dropdown class
  $html.on('click', function (e) {
    $('.nav-dropdown').removeClass('active');
  });

  //not sure about this one yet.
  function offCanvasCheck(el) {
    if (el.hasClass('off-canvas-nav-left')) {
      return 'off-canvas-nav-left';
    }
  }
  //Toggle open and close nav styles on click
  //Hamburger to X toggle
  $body.append('<div class="nav-overlay"></div>');
  $('.nav-overlay').on('click', function () {
    //$navtoggle.removeClass('active');
    $navlist.removeClass('active');
    $nav.find('nav > ul, .nav-toggle').removeClass('active');
    $body.removeClass('active');
    $html.removeClass('active');
  });
  $navtoggle.on('click', function (e) {
    //active on toggler and item.
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('active');
    var target = $(this).data('target');
    if (target) {
      $("#" + target).find('nav > ul').toggleClass('active');
    } else {
      $(this).parent().parent().find('nav >ul.nav-list').toggleClass('active');
    }


    var navType = $(this).parent().parent().parent().data("navType");

    if (navType) {
      $body.toggleClass('active');
    }
    //$navlist.toggleClass('active');
    //look for secondary actions, and respond
    //var navType = $(this).data("navType");
  });


})(jQuery); // end jQuery
