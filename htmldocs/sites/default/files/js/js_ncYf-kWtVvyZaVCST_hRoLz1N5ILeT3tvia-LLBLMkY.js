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
/**
 * @file
 * Javascript for the interface at admin/content/media and also for interfaces
 * related to setting up media fields and for media type administration.
 *
 * Basically, if it's on the /admin path, it's probably here.
 */

(function ($) {

/**
 * Functionality for the thumbnail display
 */
Drupal.behaviors.mediaAdmin = {
  attach: function (context) {
    // Show a javascript confirmation dialog if a user has files selected and
    // they try to switch between the "Thumbnail" and "List" local tasks.
    $('.media-display-switch a').bind('click', function () {
      if ($(':checkbox:checked', $('form#media-admin')).length != 0) {
        return confirm(Drupal.t('If you switch views, you will lose your selection.'));
      }
    });

    // Configure the "Add file" link to fire the media browser popup.
    var $launcherLink = $('<a class="media-launcher" href="#"></a>').html(Drupal.t('Add file'));
    $launcherLink.bind('click', function () {
      // This option format needs *serious* work.
      // Not even bothering documenting it because it needs to be thrown.
      // See media.browser.js and media.browser.inc - media_browser()
      // For how it gets passed.
      var options = {
        disabledPlugins: ['library'],
        multiselect: true
      };
      Drupal.media.popups.mediaBrowser(function (mediaFiles) {
        // When the media browser succeeds, we refresh
        // @TODO: Should jump to the new media file and perhaps highlight it.
        parent.window.location.reload();
        return false;
      }, options);
    });

    $('ul.action-links', context).prepend($('<li></li>').append($launcherLink));

    if ($('.media-display-thumbnails').length) {
      // Implements 'select all/none' for thumbnail view.
      // @TODO: Support grabbing more than one page of thumbnails.
      var allLink = $('<a href="#">' + Drupal.t('all') + '</a>')
        .click(function () {
          $('.media-display-thumbnails', $(this).parents('form')).find(':checkbox').attr('checked', true).change();
          return false;
        });
      var noneLink = $('<a href="#">' + Drupal.t('none') + '</a>')
        .click(function () {
          $('.media-display-thumbnails', $(this).parents('form')).find(':checkbox').attr('checked', false).change();
          return false;
        });
      $('<div class="media-thumbnails-select" />')
        .append('<strong>' + Drupal.t('Select') + ':</strong> ')
        .append(allLink)
        .append(', ')
        .append(noneLink)
        .prependTo('#media-admin > div')
      // If the media item is clicked anywhere other than on the image itself
      // check the checkbox. For the record, JS thinks this is wonky.
      $('.media-item').bind('click', function (e) {
        if ($(e.target).is('img, a')) {
          return;
        }
        var checkbox = $(this).parent().find(':checkbox');
        if (checkbox.is(':checked')) {
          checkbox.attr('checked', false).change();
        } else {
          checkbox.attr('checked', true).change();
        }
      });

      // Add an extra class to selected thumbnails.
      $('.media-display-thumbnails :checkbox').each(function () {
        var checkbox = $(this);
        if (checkbox.is(':checked')) {
          $(checkbox.parents('li').find('.media-item')).addClass('selected');
        }

        checkbox.bind('change.media', function () {
          if (checkbox.is(':checked')) {
            $(checkbox.parents('li').find('.media-item')).addClass('selected');
          }
          else {
            $(checkbox.parents('li').find('.media-item')).removeClass('selected');
          }
        });
      });
    }

    // When any checkboxes are clicked on this form check to see if any are checked.
    // If any checkboxes are checked, show the edit options (@todo rename to edit-actions).
    $('#media-admin :checkbox').bind('change', function () {
      Drupal.behaviors.mediaAdmin.showOrHideEditOptions();
    });

    Drupal.behaviors.mediaAdmin.showOrHideEditOptions();
  },

  // Checks if any checkboxes on the form are checked, if so it will show the
  // edit-options panel.
  showOrHideEditOptions: function() {
    var fieldset = $('#edit-options');
    if (!$('#media-admin input[type=checkbox]:checked').size()) {
      fieldset.slideUp('fast');
    }
    else {
      fieldset.slideDown('fast');
    }
  }
};


/**
 * JavaScript for the Media types administrative form.
 */
Drupal.behaviors.mediaTypesAdmin = {
  attach: function (context) {
    if ($('.form-item-match-type', context).length == 0) {
      return;
    }
    // Toggle the 'other' text field on Match type.
    if ($('.form-item-match-type input:checked').val() != 'other') {
      $('.form-item-match-type-other').hide();
    }
    $('.form-item-match-type input').change(function () {
      if ($(this).val() == 'other') {
        $('.form-item-match-type-other').slideDown('fast');
      }
      else {
        $('.form-item-match-type-other').slideUp('fast');
      }
    });
  }
};



})(jQuery);
;
