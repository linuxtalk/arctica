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
 * Attach the machine-readable name form element behavior.
 */
Drupal.behaviors.machineName = {
  /**
   * Attaches the behavior.
   *
   * @param settings.machineName
   *   A list of elements to process, keyed by the HTML ID of the form element
   *   containing the human-readable value. Each element is an object defining
   *   the following properties:
   *   - target: The HTML ID of the machine name form element.
   *   - suffix: The HTML ID of a container to show the machine name preview in
   *     (usually a field suffix after the human-readable name form element).
   *   - label: The label to show for the machine name preview.
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - standalone: Whether the preview should stay in its own element rather
   *     than the suffix of the source element.
   *   - field_prefix: The #field_prefix of the form element.
   *   - field_suffix: The #field_suffix of the form element.
   */
  attach: function (context, settings) {
    var self = this;
    $.each(settings.machineName, function (source_id, options) {
      var $source = $(source_id, context).addClass('machine-name-source');
      var $target = $(options.target, context).addClass('machine-name-target');
      var $suffix = $(options.suffix, context);
      var $wrapper = $target.closest('.form-item');
      // All elements have to exist.
      if (!$source.length || !$target.length || !$suffix.length || !$wrapper.length) {
        return;
      }
      // Skip processing upon a form validation error on the machine name.
      if ($target.hasClass('error')) {
        return;
      }
      // Figure out the maximum length for the machine name.
      options.maxlength = $target.attr('maxlength');
      // Hide the form item container of the machine name form element.
      $wrapper.hide();
      // Determine the initial machine name value. Unless the machine name form
      // element is disabled or not empty, the initial default value is based on
      // the human-readable form element value.
      if ($target.is(':disabled') || $target.val() != '') {
        var machine = $target.val();
      }
      else {
        var machine = self.transliterate($source.val(), options);
      }
      // Append the machine name preview to the source field.
      var $preview = $('<span class="machine-name-value">' + options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix + '</span>');
      $suffix.empty();
      if (options.label) {
        $suffix.append(' ').append('<span class="machine-name-label">' + options.label + ':</span>');
      }
      $suffix.append(' ').append($preview);

      // If the machine name cannot be edited, stop further processing.
      if ($target.is(':disabled')) {
        return;
      }

      // If it is editable, append an edit link.
      var $link = $('<span class="admin-link"><a href="#">' + Drupal.t('Edit') + '</a></span>')
        .click(function () {
          $wrapper.show();
          $target.focus();
          $suffix.hide();
          $source.unbind('.machineName');
          return false;
        });
      $suffix.append(' ').append($link);

      // Preview the machine name in realtime when the human-readable name
      // changes, but only if there is no machine name yet; i.e., only upon
      // initial creation, not when editing.
      if ($target.val() == '') {
        $source.bind('keyup.machineName change.machineName input.machineName', function () {
          machine = self.transliterate($(this).val(), options);
          // Set the machine name to the transliterated value.
          if (machine != '') {
            if (machine != options.replace) {
              $target.val(machine);
              $preview.html(options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix);
            }
            $suffix.show();
          }
          else {
            $suffix.hide();
            $target.val(machine);
            $preview.empty();
          }
        });
        // Initialize machine name preview.
        $source.keyup();
      }
    });
  },

  /**
   * Transliterate a human-readable name to a machine name.
   *
   * @param source
   *   A string to transliterate.
   * @param settings
   *   The machine name settings for the corresponding field, containing:
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - maxlength: The maximum length of the machine name.
   *
   * @return
   *   The transliterated source string.
   */
  transliterate: function (source, settings) {
    var rx = new RegExp(settings.replace_pattern, 'g');
    return source.toLowerCase().replace(rx, settings.replace).substr(0, settings.maxlength);
  }
};

})(jQuery);
;
