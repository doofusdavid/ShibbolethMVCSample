// @codekit-prepend "browser-check.js";

// (function($) {
//   if(!is_okbrowser()){
//     $('<div class="notification-bar__message"><p><img draggable="false" class="emoji" alt="⚠️" src="https://s.w.org/images/core/emoji/12.0.0-1/svg/26a0.svg"> Warning: <a href="https://web.colostate.edu/browsers">Your web browser may be out of date,</a> and might be prevented from using this service in the future.</p></div>').insertBefore('#mainheader');
//   }    
// })( jQuery );

//a11y fix for only-child icons in links (elementor icon links)
enterDom('a > i[aria-hidden="true"]:only-child', function(el) {
	var parentElement = el.parentNode;
	var text = [].reduce.call(parentElement.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '').trim();
	if(text == ""){
		el.parentNode.setAttribute("aria-hidden", "true");
		el.parentNode.setAttribute("tabindex", "-1");
	}
});

function navToggle(){
	if(document.body.classList.contains('nav-active')){
		// console.log("close nav");
		var toggle = document.querySelector('.c-hamburger');
		toggle.click();
	}
}

document.onkeydown = function(evt) {
	evt = evt || window.event;
	//if escape key presssed, do stuff
	if (evt.key == "Escape") {
		// console.log("esc pressed");
		navToggle();
	}
};

//Keyboard nav friendly focus
//detects when keyboard nav starts
function handleFirstTab(e) {
	if (e.keyCode === 9) {
		document.body.classList.add('user-is-tabbing');
		window.removeEventListener('keydown', handleFirstTab);
		window.addEventListener('mousedown', handleMouseDownOnce);
	}
}
//detects when mouse clicking starts
function handleMouseDownOnce() {
	document.body.classList.remove('user-is-tabbing');
	window.removeEventListener('mousedown', handleMouseDownOnce);
	window.addEventListener('keydown', handleFirstTab);
}
window.addEventListener('keydown', handleFirstTab);
//end Keyboard nav friendly focus

(function($) {
	console.log('v2');
})( jQuery );

//new nav
(function ($) { // Begin jQuery

	var tabkey = 9;
	//usage: if (e.keyCode === tabkey)
  
	var $body = $('body');
	var $html = $('html');
	var $nav = $('#mainheader .nav-component');
	var $navlist = $('#mainheader nav ul').first();
	var $navtoggle = $('#mainheader .nav-toggle');

	//add classes to headings
	// var $headings = $('h1, h2, h3, h4, h5, h6');
	// $headings.addClass('is_heading');
  
	// $nav.each(function () {
	//   var navType = $(this).data("navType");
	//   if (navType) {
	// 	$(this).addClass(navType);
	// 	$body.addClass(navType);
	//   }
	// });
  
	// $(window).resize(function () {
	//   $navlist.addClass('inactive');
	//   clearTimeout(window.resizedFinished);
	//   window.resizedFinished = setTimeout(function () {
	// 	//console.log('Resized finished.');
	// 	$navlist.removeClass('inactive');
	//   }, 250);
	// });
  
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


	//clone links in dropdown if not empty
	$('#mainheader nav a[href][href!="#"][href!=""]:not([href^=" "]) + ul').prev().addClass('doublelink');
	$('#mainheader nav a[href][href!="#"][href!=""]:not([href^=" "]) + ul').each(function () {
	  var a = "<li class='generated-link'><a href='" + $(this).prev().attr('href') + "'>" + $(this).prev().text() + "</a></li>";
	  $(this).prepend(a);
	})
  
	//If a link has a dropdown, add sub menu toggle.
	var $dropdown = $('#mainheader nav ul li a:not(:only-child)');
	var $dropdownListItem = $dropdown.parent();
	
	//trigger parent click on mouseover - FEELS LIKE A BOOTSTRAP HACK
	$dropdownListItem.on('mouseenter', function (e) {
	  var $child = $(this).find(">a:not(:only-child)");
	  $child.trigger('click');
	});
	$dropdownListItem.on('mouseleave', function (e) {
	  var $child = $(this).find(">a:not(:only-child)");
	  if ($child.siblings('.sub-menu').hasClass('active')) {
		$child.trigger('click');
	  }
	});
	$dropdown.on('click', function (e) {
	  //checks to see if we are in mobile view - if so, treat dropdown links with links as normal
	  //if(! $(this).closest('nav > ul ').hasClass('active') ){
	  if (!$('body').hasClass('mobile')) {
		//prevents normal link from firing
		//console.log(e);
		e.preventDefault();
		e.stopPropagation();
		$this = $(this);
		//adds active class
		// console.log($(this));
		$this.parent().toggleClass('active');
		$this.siblings('.sub-menu').toggleClass('active');
		//removes active from other menus
		$others = $('.sub-menu').not($this.siblings());
		$others.parent().removeClass('active');
		$others.removeClass('active');
	  }
	  // Close one dropdown when selecting another
	});

	//Clicking away from dropdown will remove the dropdown class
	$html.on('click', function (e) {
		$activeMenu = $('#mainheader .sub-menu.active');
		$activeMenu.removeClass('active');
		$activeMenu.parent().removeClass('active');
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