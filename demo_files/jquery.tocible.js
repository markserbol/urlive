/*
 * jquery.tocible.js v1.1.1, Tocible
 *
 * Copyright 2014 Mark Serbol.   
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/MIT.
 *
 * A lightweight jQuery plugin for creating table of contents navigation menu
 * https://github.com/markserbol/tocible
 *
 */
 
;(function($){
  var defaults = {
		heading:'h2',
		subheading:'h3',
		navigation:'nav',
		title:'',
		hash:false,
		offset:50,
		speed:800,
		collapsible:false
  };
		
  $.fn.tocible = function(options){
		var opts = $.extend({}, defaults, options);
	
		return this.each(function(){
			var wrapper = $(this), nav, heading, subheading, left, oleft; 
			
			nav = wrapper.find(opts.navigation);
			
			left = nav.offset().left;
			oleft = left - wrapper.offset().left;
			
			nav.addClass('tocible').html('<ul/>');
			
			wrapper.css({'position':'relative'});
			
			if(opts.title){
				var title = $(opts.title).length ? $(opts.title).text() : opts.title;
				var head = $('<div/>', {class:'tocible_header', html:'<span/>'+title });
				
				head.prependTo(nav).click(function() {
					$(this).siblings('ul').slideToggle({
					duration:'slow',
					step:contain
					});
					
					$(this).find('span').toggleClass('toc_open'); 		
				});	
			}
										
			heading = wrapper.find(opts.heading);
			subheading = wrapper.find(opts.subheading);
	
			heading.add(subheading).each(function() {
				var el = $(this), href, title, type, anchor, list;
				
				href = el.attr('id') ? '#'+el.attr('id'): '#';
				title = el.text();
				
				if(el.is(heading)) {
					type = 'heading';
				} else if(el.is(subheading)) {
					type = 'subheading';
				}
				
				anchor = $('<a/>', {text:title, href:href});				
				list = $('<li/>', {class:'tocible_'+type});			
				list.append(anchor).appendTo('.tocible > ul');
							
				anchor.click(function(e) {
					e.preventDefault();
					
					var offset = el.offset();
			
					if(opts.hash){
					var winTop = $(window).scrollTop();
		
					if(history.pushState){
						history.pushState({}, document.title, href);
					}else{
						window.location.hash = href;
						$(window).scrollTop(winTop);
					}
					}		  
					$('html, body').stop(true).animate({scrollTop:offset.top - 10}, opts.speed);
				});
				
			});
			
			contain = function(){
				var winTop = $(window).scrollTop(), wrapTop = wrapper.offset().top;
					
				nav.css({'top':opts.offset, 'bottom':'auto', 'left':left});
				
				if(wrapTop + wrapper.outerHeight() <= winTop + nav.height() + opts.offset){
					nav.css({'position':'absolute', 'bottom':0, 'top':'auto', 'left': oleft});
				}else if(winTop >= wrapTop){
					nav.css({'position':'fixed', 'bottom':'auto', 'top':opts.offset});
				}else{
					nav.css({'position':'absolute', 'left':oleft});
				}		
			};
			
			onScroll = function(){
				if(opts.collapsible){ $('.tocible li.tocible_subheading').hide(); }
							
				heading.add(subheading).each(function(index) {
					var el = $(this), elTop = el.offset().top, 
					target = $('.tocible li').eq(index),
					winTop = $(window).scrollTop();
			
					if(winTop >= elTop - 20){
						target.addClass('toc_scrolled').siblings().removeClass('toc_scrolled');
						if(opts.collapsible){
							target.siblings().filter('.tocible_subheading').hide();
							if(target.is('.tocible_subheading')){
								target.prevAll('.tocible_heading:first').nextUntil('.tocible_heading').show();
							}else if(target.is('.tocible_heading')){
								target.nextUntil('.tocible_heading').show();
							}
						}
					}else{
						target.removeClass('toc_scrolled');
					}
				});
			};
					
			$(window).scroll(function() {
				contain();
				onScroll();
			}).trigger('scroll');
					
		});				
  };

})(jQuery);
