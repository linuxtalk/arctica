/*
* Based on the work of
* Copyright (C) 2009 Joel Sutherland
* Licenced under the MIT license
* http://www.newmediacampaigns.com/page/jcaption-a-jquery-plugin-for-simple-image-captions
*/
Drupal.behaviors.jcaption = {
  attach: function(context, settings) {
      (function($) {
      
      var captionSelectors = Drupal.settings.jcaption.jcaption_selectors;
      
    	$.fn.jcaption = function(settings) {
    		settings = $.extend({
    			wrapperElement: 'div',
    			wrapperClass: 'caption',
    			captionElement: 'p',
    			imageAttr: Drupal.settings.jcaption.jcaption_alt_title,
    			requireText: Drupal.settings.jcaption.jcaption_requireText,
    			copyStyle: Drupal.settings.jcaption.jcaption_copyStyle,
    			removeStyle: Drupal.settings.jcaption.jcaption_removeStyle,
    			removeClass: Drupal.settings.jcaption.jcaption_removeClass,
    			removeAlign: Drupal.settings.jcaption.jcaption_removeAlign,
    			copyAlignmentToClass: Drupal.settings.jcaption.jcaption_copyAlignmentToClass,
    			copyFloatToClass: Drupal.settings.jcaption.jcaption_copyFloatToClass,
    			copyClassToClass: Drupal.settings.jcaption.jcaption_copyClassToClass,
    			autoWidth: Drupal.settings.jcaption.jcaption_autoWidth,
    			keepLink: Drupal.settings.jcaption.jcaption_keepLink,
          styleMarkup: Drupal.settings.jcaption.jcaption_styleMarkup,
    			animate: Drupal.settings.jcaption.jcaption_animate,
    			show: {opacity: 'show'},
    			showDuration: Drupal.settings.jcaption.jcaption_showDuration,
    			hide: {opacity: 'hide'},
    			hideDuration: Drupal.settings.jcaption.jcaption_hideDuration	
    		}, settings);
    
    		return $(this).each(function(){
    			//Only add the caption after the image has been loaded.  This makes sure we can know the width of the caption.
    			
    			$(this).bind('load', function(){
    				
    				//Make sure the captioning isn't applied twice when the IE fix at the bottom is applied
    				if($(this).data('loaded')) return false;
    				$(this).data('loaded', true);
    			
    				//Shorthand for the image we will be applying the caption to
    				if($(this).parent("a").length > 0 && !settings.keepLink) {
    				  var image = $(this).parent("a");
      			  var cleanimage = $(this);    				
      			  } 
    				else {
      			  var image = $(this);
      			  var cleanimage = $(this);    				
    				}

    				//Only create captions if there is content for the caption
    				if(cleanimage.attr(settings.imageAttr).length > 0 || !settings.requireText){
    					
    					//Wrap the image with the caption div
    					image.wrap("<" + settings.wrapperElement + " class='" + settings.wrapperClass + "'></" + settings.wrapperElement + ">");
    					
    					//Save Image Float
    					var imageFloat = cleanimage.css('float')
    					
    					//Save Image Class
    					var imageClass = cleanimage.attr('class');
    					if(settings.removeClass) cleanimage.removeAttr('class');

    					//Save Image Style
    					var imageStyle = cleanimage.attr('style');
    					if(settings.removeStyle) cleanimage.removeAttr('style');
    					
    					//Save Image Align
    					var imageAlign = cleanimage.attr('align');
    					if(settings.removeAlign) cleanimage.removeAttr('align');
    					
    					//Put Caption in the Wrapper Div
    					var div = image.parent().append('<' + settings.captionElement + '>' + cleanimage.attr(settings.imageAttr) + '</' + settings.captionElement + '>');
    					
              //Add css if there is style markup for the paragraph in the settings
              //if(settings.styleMarkup) 
              
              if(settings.styleMarkup) {
                $('.caption p').attr('style', function() {
                  return settings.styleMarkup; 
                });
              }
              
    					if(settings.animate){
    						$(this).next().hide();
    						$(this).parent().hover(
    						function(){
    							$(this).find('p').animate(settings.show, settings.showDuration);
    						},
    						function(){
    							$(this).find('p').animate(settings.hide, settings.hideDuration);
    						});
    					}
    					
    					//Copy Image Style to Div
    					if(settings.copyStyle) div.attr('style',imageStyle);
    					
    					//If there is an alignment on the image (for example align="left") add "left" as a class on the caption.  This helps deal with older Text Editors like TinyMCE
    					if(settings.copyAlignmentToClass) div.addClass(imageAlign);
    					
    					//Transfers the float style from the image to the caption container
    					if(settings.copyFloatToClass) div.addClass(imageFloat);
    					
     					//Transfers the class from the image to the caption container
    					if(settings.copyClassToClass) div.addClass(imageClass);
    					
    					//Properly size the caption div based on the loaded image's size
    					if(settings.autoWidth) div.width(image.width());
    				}
    			});
    			
    			// Thanks to Captify for this bit!
    			//if the image has already loaded (due to being cached), force the load function to be called
    			if (this.complete || this.naturalWidth > 0){
    				$(this).trigger('load');
    			}
    		});
    	}
    	
    	$(captionSelectors.join(",")).each(function(index, elem){
    	  $(elem).jcaption();
    	});
    
    })(jQuery);
  }
};

(function ($) {
  $(document).ready(function(){

  });
})(jQuery);;

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.drupalSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
