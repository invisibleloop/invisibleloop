/*
 * jQuery sslide v 1.0.0
 *
 * create a slideshow from an unordered list of images
 *
 * Copyright (c) 2010 Andy Stubbs
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Example usage $('#slideshow').sslide();
 *
 * 				 $('#slideshow').sslide({delay:2000});
 *
 *
 * Tested in IE 7, 8, 9 / firefox 3.6.11, 4 / chrome 11(mac) / safari 4, 5
 * Requires jQuery v 1.2 or above
 * 
 */
 
(function($){

	$.fn.sslide = function(options) {
	
		/* 	set defaults */
		
		var defaults = {
			delay: 5000,
			color:'#fff',
			background:'#000',
			opacity:'0.7',
			caption:true
		};
		
		var options = $.extend(defaults, options);
		
		/* find every element with id #slideshow */

		return this.each(function() {
		
		    var $this = $(this);
		    
		    $this.find('li:first').addClass('active');
		    
		    if (options.caption === true){
		    
			    $caption = $this.find('.active img').attr('alt');
			    
			    $('<span class="sshow-caption">'+$caption+'</span><span class="sshow-caption-bg"></span>').appendTo($this);
			    
			    $this.find('.sshow-caption').css({
			    	color:options.color
			    });
			    
			    $this.find('.sshow-caption-bg').css({
				    opacity:options.opacity,
				    background:options.background
			    });
		    
		    }
		   	
		   	/* start loop after set time */
		   	
		   	var $play = setInterval(slideAction, options.delay)	
		   	
		   	/* function to set active image */
		   	
		   	function slideAction() {
		   		
		   		if (options.caption === true){
		   			$this.find('.sshow-caption').fadeOut(500);
		   		}
			   	var $active = $this.find('li.active');
			   	
			    if ( $active.length == 0 ) $active = $this.find('li:last');

    			var $next =  $active.next().length ? $active.next() : $this.find('li:first');    
			
			    $active.addClass('last-active');
			    
			    $next.css({opacity: 0.0})
		        .addClass('active')
		        .animate({opacity: 1.0}, 1000, function() {
		            $active.removeClass('active last-active');
		            if (options.caption === true){
		            	$this.find('.sshow-caption').text($this.find('.active img').attr('alt')).fadeIn(500);
		            }
		        });
				
		   	} 
		   	
		   	$this.hover(function() {
			    clearInterval($play);
			},
			function() {
			    $play =  setInterval(slideAction, options.delay);
			});	
		    
		 });
		 

	};
	
})(jQuery);