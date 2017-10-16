"use strict";
jQuery(document).ready(function($){
	var secondaryNav = $('.site-menu'),
		animate_btn = $('.ps-btn'),
		site_menu_trigger = $('.site-menu-trigger'),
		secondaryNavTopPosition = secondaryNav.offset().top - 2,
		taglineOffesetTop = $('#bannr_text').offset().top + $('#bannr_text').height() + parseInt($('#bannr_text').css('paddingTop').replace('px', '') , 10),
		contentSections = $('.ps-section'),
		ps_primary_nav = 'ps-primary-nav',
		ps_main_content = $('.ps-main-content');
	$(window).on('scroll', function(){
		//on desktop - assign a position fixed to logo and action button and move them outside the viewport
		( $(window).scrollTop() > taglineOffesetTop ) ? animate_btn.addClass('is-hidden') : animate_btn.removeClass('is-hidden');
		
		//on desktop - fix secondary navigation on scrolling
		if($(window).scrollTop() > secondaryNavTopPosition  ) {
			//fix secondary navigation
			secondaryNav.addClass('is-fixed');
			//push the .ps-main-content giving it a top-margin
			ps_main_content.addClass('has-top-margin');	
			//on Firefox CSS transition/animation fails when parent element changes position attribute
			//so we to change secondary navigation childrens attributes after having changed its position value
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	            animate_btn.addClass('slide-in');
				
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			ps_main_content.removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	            animate_btn.removeClass('slide-in');
			}, 50);
		}

		//on desktop - update the active link in the secondary fixed navigation
		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', ''), 10) + parseInt(actual.css('paddingBottom').replace('px', ''), 10),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
			
		});

	}

	//on mobile - open/close secondary navigation clicking/tapping the .site-menu-trigger
	site_menu_trigger.on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find(' ul').toggleClass('is-visible');
	});

	//smooth scrolling when clicking on the secondary navigation items
	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        ); 
        //on mobile - close secondary navigation
        site_menu_trigger.removeClass('menu-is-open');
        secondaryNav.find(' ul').removeClass('is-visible');
    });

    //on mobile - open/close primary navigation clicking/tapping the menu icon
	$(ps_primary_nav).on('click', function(event){
		if($(event.target).is(ps_primary_nav)) $(this).children('ul').toggleClass('is-visible');
	});
});
$(document).ready(function() {
	var acordion_toggle = $('.accordion-toggle');
	$('.accordion').find(acordion_toggle).on('click', function() {
		$(this).next().slideToggle('600');
		$(".accordion-content").not($(this).next()).slideUp('600');
	});
	$(acordion_toggle).on('click', function() {
		$(this).toggleClass('active').siblings().removeClass('active');
	});
});