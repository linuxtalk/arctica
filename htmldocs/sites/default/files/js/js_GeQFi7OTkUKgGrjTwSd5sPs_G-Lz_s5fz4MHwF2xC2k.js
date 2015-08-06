(function ($) {	
	$(document).ready(function() {
		$("div.dupree_contact_form form button").click(function(event){
			event.preventDefault();

			$("div.dupree_contact_form form").send_email_from_form();
			
		});
	});
})(jQuery);
;
var config = {}
config.text_limit = 140;

var glidecontentwrapper;

(function ($) {	

	$.fn.send_email_from_form = function() {
	
		var _this = this;
		var data={};
			
		$(this).find("input").each(function() {
			switch ($(this).attr("type")) {
				case "text": case "hidden":
					data[$(this).attr("id")] = $(this).val();
					break;
				case "checkbox":
					data[$(this).attr("id")] = $(this).attr("checked");
					break;
			}
		});
		$(this).find("textarea").each(function() {
			data[$(this).attr("id")] = $(this).val();
		});
			
		$.ajax({
			type: "POST",
			url: "/sites/all/modules/dupree_core/php/email_form.php",
			data: data,
			beforeSend : function () {
				$(_this).parent().fadeRefresh("Thank you for your interest");
			},
			success: function (result) {
				$(_this).parent().fadeRefresh(result)
			}
		});
	}

    $.fn.clear_class = function() {
		$(this).attr("class","");
	}
    
	$.fn.more_testimonials_click = function(){
	    event.preventDefault();
		
		$("#full_testimonials").remove();
		$("#Glidercontent_glider_0").before("<div id=full_testimonials class=full_testimonials></div>");
		
		
		//var new_glider = $(".glidecontent:first-child").parent().clone();
		
		$("#full_testimonials").append("<div><div id=more_testimonials_close>x</div></div>");
		$("#full_testimonials").append($(glidecontentwrapper).html());
		
		$("#more_testimonials_close").click(function() {
			$("#full_testimonials").remove();
		})
		
		
		$("#full_testimonials").fadeIn();
	
	}

	$.fn.limit_text = function () {
		var html = $(this).html();
		var newhtml = html.substring(0,config.text_limit)+" <a class=more_testimonials href=\"more testimonials\">More...</a></p>";
		$(this).html(newhtml);
		
		$(".glidecontent a").click(function(event) {
			
			$(this).more_testimonials_click(event);
		})
	}
	
	$(document).ready(function() {
	    glidecontentwrapper = $("#Glidercontent_glider_0").clone();
		$(glidecontentwrapper).attr("id","glider_clone")
							  .find("div").each(function (){
								$(this).clear_class();
							  })
							  
		$(".glidecontent p:first-child").parent().each(function (){
			$(this).limit_text();
		});
	});
})(jQuery);
;
(function ($) {	

})(jQuery);
;
(function ($) {	
	$(document).ready(function() {
		
	});
})(jQuery);
;
(function ($) {	

})(jQuery);
;
(function ($) {	
	$(document).ready(function() {
		
	});
})(jQuery);
;
(function ($) {	
	$(document).ready(function() {
		
	});
})(jQuery);
;
(function ($) {	
	$.fn.fadeRefresh = function(html) {
		$(this).fadeOut( "fast", "linear", 
			function () {
				$(this)
					.html(html)
					.fadeIn("fast", "linear");
			}
		);
		return this;
	}
	
	$(document).ready(function() {
		$("#btn_property_alert").click(function(event) {
			event.preventDefault();
			$("#frm_property_alert").fadeToggle( "fast", "linear");
		});
		
		$("#btn_submit_property_alert").click(function(event){
			event.preventDefault();
			$("#frm_property_alert").send_email_from_form();
		});
	});
})(jQuery);
;
(function ($) {	
	$(document).ready(function() {
		$("#btn_valuation_request").click(function(event) {
			event.preventDefault();
			$("#frm_valuation_request").fadeToggle( "fast", "linear");
		});
		
		$("#btn_submit_valuation_request").click(function(event){
			event.preventDefault();
			
			
			$("#frm_valuation_request").send_email_from_form();
			
		})
		
		
		
	});
})(jQuery);
;
(function ($) {	

	$.fn.getNumeric = function() {
		var result = parseInt($(this).html().replace(/[^\d]/g, ""));
		return result;
	}; 

	$(document).ready(function() {
	
		$("#chk_res").click(function() {
			$("#s-bedrooms").fadeIn();
		})
		$("#chk_comm").click(function() {
			$("#s-bedrooms").fadeOut();
		})
		
		$("#btn_prop_filter").click(function(event) {
			event.preventDefault();
			
			$(".dupree_vebra_search").show();
			$("div.verba_property").hide();
			
			var hip = parseInt($("#hip").val())
			var lop = parseInt($("#lop").val())
			var beds = parseInt($("#beds").val())
			
			var prop_type = $('#chk_res').is(':checked')?"residential":"commercial";
			var prop_count = 0;
			var price = 0;
			
			$("div.verba_property").each(function(){
			
				price = parseInt($(this).find("div.price span.number").html());			
				var bedroom = parseInt($(this).find("div.bedrooms span.number").html());
				bedroom = (isNaN(bedroom))?0:bedroom;
				var property_type = $(this).find("div.property_type span.text").html()
			
				if	((prop_type=="residential" && property_type!="Commercial Property" && bedroom > 0 && bedroom>= beds && price >= lop && price <= hip) 
					||
					(prop_type=="commercial" && property_type=="Commercial Property" && price >= lop && price <= hip))
				{
					$(this).fadeIn();
					prop_count++;
				} else {
					$(this).fadeOut();
				}
			});
			
			var prop_text = (prop_count==1)?"property":"properties";
			$("#prop_count").html(prop_count+ " " + prop_text + " found");
			$("#prop_count").fadeIn();
			
			
		});
	});
})(jQuery);
;
(function ($) {	
	$(document).ready(function() {
	
		//var content = $(".content").html();
		//var new_content = content.replace (/\&\#13\;/g,"")
		//$(".content").html(new_content)
	
		$.fn.baseName = function (attr){
			var str = $(this).attr(attr)
			var base = new String(str).substring(str.lastIndexOf('/') + 1); 
			if(base.lastIndexOf(".") != -1)       
			base = base.substring(0, base.lastIndexOf("."));
			return base;
		}
	
	
		$("a.rsimg, #rm_list a").click(function() {
			
		})
		
		$("div.verba_property a.more").click(function(event) {
			
			event.preventDefault();
			
			var top = event.pageY;
			
			var prop_ref = $(this).baseName("href")
			
			$("#property_details").remove();
			$("body").append("\
			<div id=property_details style=display:none><div id=p_menu><div id=p_close>X</div></div>\
			<div id=p_content></div>\
			</div>\
			");
			
			$("#p_content")
							.html(prop_ref)
			$("#property_details")	
									.css({position:"absolute",top:top+"px"})
									.fadeIn();
			$("#p_close")
							.css({cursor:"pointer"})
							.click(function(){
								$("#property_details").remove();
							})
							
			var data = {};
			data.propery_reference = prop_ref;
			
			$.ajax({
				type: "POST",
				url: "/sites/all/modules/dupree_core/php/vebra_property_details.php",
				data: data,
				beforeSend : function () {
					$("#p_content").html("Searching for property...");
				},
				success: function (result) {
					$("#p_content").html(result)
					
					$("div.sub_photo img").click(function(event){
						event.preventDefault();
						var src = $(this).attr("src");
						$("div.main_photo img").attr("src",src)
					});
					
					$("div.sub_photo img").error(function(){
						$(this).remove();
					});
					
				}
			});
		})
	});
})(jQuery);
;
(function ($) {	

})(jQuery);
;
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};
Drupal.admin.hashes = Drupal.admin.hashes || {};

/**
 * Core behavior for Administration menu.
 *
 * Test whether there is an administration menu is in the output and execute all
 * registered behaviors.
 */
Drupal.behaviors.adminMenu = {
  attach: function (context, settings) {
    // Initialize settings.
    settings.admin_menu = $.extend({
      suppress: false,
      margin_top: false,
      position_fixed: false,
      tweak_modules: false,
      tweak_permissions: false,
      tweak_tabs: false,
      destination: '',
      basePath: settings.basePath,
      hash: 0,
      replacements: {}
    }, settings.admin_menu || {});
    // Check whether administration menu should be suppressed.
    if (settings.admin_menu.suppress) {
      return;
    }
    var $adminMenu = $('#admin-menu:not(.admin-menu-processed)', context);
    // Client-side caching; if administration menu is not in the output, it is
    // fetched from the server and cached in the browser.
    if (!$adminMenu.length && settings.admin_menu.hash) {
      Drupal.admin.getCache(settings.admin_menu.hash, function (response) {
          if (typeof response == 'string' && response.length > 0) {
            $('body', context).append(response);
          }
          var $adminMenu = $('#admin-menu:not(.admin-menu-processed)', context);
          // Apply our behaviors.
          Drupal.admin.attachBehaviors(context, settings, $adminMenu);
          // Allow resize event handlers to recalculate sizes/positions.
          $(window).triggerHandler('resize');
      });
    }
    // If the menu is in the output already, this means there is a new version.
    else {
      // Apply our behaviors.
      Drupal.admin.attachBehaviors(context, settings, $adminMenu);
    }
  }
};

/**
 * Collapse fieldsets on Modules page.
 */
Drupal.behaviors.adminMenuCollapseModules = {
  attach: function (context, settings) {
    if (settings.admin_menu.tweak_modules) {
      $('#system-modules fieldset:not(.collapsed)', context).addClass('collapsed');
    }
  }
};

/**
 * Collapse modules on Permissions page.
 */
Drupal.behaviors.adminMenuCollapsePermissions = {
  attach: function (context, settings) {
    if (settings.admin_menu.tweak_permissions) {
      // Freeze width of first column to prevent jumping.
      $('#permissions th:first', context).css({ width: $('#permissions th:first', context).width() });
      // Attach click handler.
      $modules = $('#permissions tr:has(td.module)', context).once('admin-menu-tweak-permissions', function () {
        var $module = $(this);
        $module.bind('click.admin-menu', function () {
          // @todo Replace with .nextUntil() in jQuery 1.4.
          $module.nextAll().each(function () {
            var $row = $(this);
            if ($row.is(':has(td.module)')) {
              return false;
            }
            $row.toggleClass('element-hidden');
          });
        });
      });
      // Collapse all but the targeted permission rows set.
      if (window.location.hash.length) {
        $modules = $modules.not(':has(' + window.location.hash + ')');
      }
      $modules.trigger('click.admin-menu');
    }
  }
};

/**
 * Apply margin to page.
 *
 * Note that directly applying marginTop does not work in IE. To prevent
 * flickering/jumping page content with client-side caching, this is a regular
 * Drupal behavior.
 */
Drupal.behaviors.adminMenuMarginTop = {
  attach: function (context, settings) {
    if (!settings.admin_menu.suppress && settings.admin_menu.margin_top) {
      $('body:not(.admin-menu)', context).addClass('admin-menu');
    }
  }
};

/**
 * Retrieve content from client-side cache.
 *
 * @param hash
 *   The md5 hash of the content to retrieve.
 * @param onSuccess
 *   A callback function invoked when the cache request was successful.
 */
Drupal.admin.getCache = function (hash, onSuccess) {
  if (Drupal.admin.hashes.hash !== undefined) {
    return Drupal.admin.hashes.hash;
  }
  $.ajax({
    cache: true,
    type: 'GET',
    dataType: 'text', // Prevent auto-evaluation of response.
    global: false, // Do not trigger global AJAX events.
    url: Drupal.settings.admin_menu.basePath.replace(/admin_menu/, 'js/admin_menu/cache/' + hash),
    success: onSuccess,
    complete: function (XMLHttpRequest, status) {
      Drupal.admin.hashes.hash = status;
    }
  });
};

/**
 * TableHeader callback to determine top viewport offset.
 *
 * @see toolbar.js
 */
Drupal.admin.height = function() {
  var $adminMenu = $('#admin-menu');
  var height = $adminMenu.outerHeight();
  // In IE, Shadow filter adds some extra height, so we need to remove it from
  // the returned height.
  if ($adminMenu.css('filter') && $adminMenu.css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) {
    height -= $adminMenu.get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

/**
 * @defgroup admin_behaviors Administration behaviors.
 * @{
 */

/**
 * Attach administrative behaviors.
 */
Drupal.admin.attachBehaviors = function (context, settings, $adminMenu) {
  if ($adminMenu.length) {
    $adminMenu.addClass('admin-menu-processed');
    $.each(Drupal.admin.behaviors, function() {
      this(context, settings, $adminMenu);
    });
  }
};

/**
 * Apply 'position: fixed'.
 */
Drupal.admin.behaviors.positionFixed = function (context, settings, $adminMenu) {
  if (settings.admin_menu.position_fixed) {
    $adminMenu.addClass('admin-menu-position-fixed');
    $adminMenu.css('position', 'fixed');
  }
};

/**
 * Move page tabs into administration menu.
 */
Drupal.admin.behaviors.pageTabs = function (context, settings, $adminMenu) {
  if (settings.admin_menu.tweak_tabs) {
    var $tabs = $(context).find('ul.tabs.primary');
    $adminMenu.find('#admin-menu-wrapper > ul').eq(1)
      .append($tabs.find('li').addClass('admin-menu-tab'));
    $(context).find('ul.tabs.secondary')
      .appendTo('#admin-menu-wrapper > ul > li.admin-menu-tab.active')
      .removeClass('secondary');
    $tabs.remove();
  }
};

/**
 * Perform dynamic replacements in cached menu.
 */
Drupal.admin.behaviors.replacements = function (context, settings, $adminMenu) {
  for (var item in settings.admin_menu.replacements) {
    $(item, $adminMenu).html(settings.admin_menu.replacements[item]);
  }
};

/**
 * Inject destination query strings for current page.
 */
Drupal.admin.behaviors.destination = function (context, settings, $adminMenu) {
  if (settings.admin_menu.destination) {
    $('a.admin-menu-destination', $adminMenu).each(function() {
      this.search += (!this.search.length ? '?' : '&') + Drupal.settings.admin_menu.destination;
    });
  }
};

/**
 * Apply JavaScript-based hovering behaviors.
 *
 * @todo This has to run last.  If another script registers additional behaviors
 *   it will not run last.
 */
Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {
  // Hover emulation for IE 6.
  if ($.browser.msie && parseInt(jQuery.browser.version) == 6) {
    $('li', $adminMenu).hover(
      function () {
        $(this).addClass('iehover');
      },
      function () {
        $(this).removeClass('iehover');
      }
    );
  }

  // Delayed mouseout.
  $('li.expandable', $adminMenu).hover(
    function () {
      // Stop the timer.
      clearTimeout(this.sfTimer);
      // Display child lists.
      $('> ul', this)
        .css({left: 'auto', display: 'block'})
        // Immediately hide nephew lists.
        .parent().siblings('li').children('ul').css({left: '-999em', display: 'none'});
    },
    function () {
      // Start the timer.
      var uls = $('> ul', this);
      this.sfTimer = setTimeout(function () {
        uls.css({left: '-999em', display: 'none'});
      }, 400);
    }
  );
};

/**
 * Apply the search bar functionality.
 */
Drupal.admin.behaviors.search = function (context, settings, $adminMenu) {
  // @todo Add a HTML ID.
  var $input = $('input.admin-menu-search', $adminMenu);
  // Initialize the current search needle.
  var needle = $input.val();
  // Cache of all links that can be matched in the menu.
  var links;
  // Minimum search needle length.
  var needleMinLength = 2;
  // Append the results container.
  var $results = $('<div />').insertAfter($input);

  /**
   * Executes the search upon user input.
   */
  function keyupHandler() {
    var matches, $html, value = $(this).val();
    // Only proceed if the search needle has changed.
    if (value !== needle) {
      needle = value;
      // Initialize the cache of menu links upon first search.
      if (!links && needle.length >= needleMinLength) {
        // @todo Limit to links in dropdown menus; i.e., skip menu additions.
        links = buildSearchIndex($adminMenu.find('li:not(.admin-menu-action, .admin-menu-action li) > a'));
      }
      // Empty results container when deleting search text.
      if (needle.length < needleMinLength) {
        $results.empty();
      }
      // Only search if the needle is long enough.
      if (needle.length >= needleMinLength && links) {
        matches = findMatches(needle, links);
        // Build the list in a detached DOM node.
        $html = buildResultsList(matches);
        // Display results.
        $results.empty().append($html);
      }
    }
  }

  /**
   * Builds the search index.
   */
  function buildSearchIndex($links) {
    return $links
      .map(function () {
        var text = (this.textContent || this.innerText);
        // Skip menu entries that do not contain any text (e.g., the icon).
        if (typeof text === 'undefined') {
          return;
        }
        return {
          text: text,
          textMatch: text.toLowerCase(),
          element: this
        };
      });
  }

  /**
   * Searches the index for a given needle and returns matching entries.
   */
  function findMatches(needle, links) {
    var needleMatch = needle.toLowerCase();
    // Select matching links from the cache.
    return $.grep(links, function (link) {
      return link.textMatch.indexOf(needleMatch) !== -1;
    });
  }

  /**
   * Builds the search result list in a detached DOM node.
   */
  function buildResultsList(matches) {
    var $html = $('<ul class="dropdown admin-menu-search-results" />');
    $.each(matches, function () {
      var result = this.text;
      var $element = $(this.element);

      // Check whether there is a top-level category that can be prepended.
      var $category = $element.closest('#admin-menu-wrapper > ul > li');
      var categoryText = $category.find('> a').text()
      if ($category.length && categoryText) {
        result = categoryText + ': ' + result;
      }

      var $result = $('<li><a href="' + $element.attr('href') + '">' + result + '</a></li>');
      $result.data('original-link', $(this.element).parent());
      $html.append($result);
    });
    return $html;
  }

  /**
   * Highlights selected result.
   */
  function resultsHandler(e) {
    var $this = $(this);
    var show = e.type === 'mouseenter' || e.type === 'focusin';
    $this.trigger(show ? 'showPath' : 'hidePath', [this]);
  }

  /**
   * Closes the search results and clears the search input.
   */
  function resultsClickHandler(e, link) {
    var $original = $(this).data('original-link');
    $original.trigger('mouseleave');
    $input.val('').trigger('keyup');
  }

  /**
   * Shows the link in the menu that corresponds to a search result.
   */
  function highlightPathHandler(e, link) {
    if (link) {
      var $original = $(link).data('original-link');
      var show = e.type === 'showPath';
      // Toggle an additional CSS class to visually highlight the matching link.
      // @todo Consider using same visual appearance as regular hover.
      $original.toggleClass('highlight', show);
      $original.trigger(show ? 'mouseenter' : 'mouseleave');
    }
  }

  // Attach showPath/hidePath handler to search result entries.
  $results.delegate('li', 'mouseenter mouseleave focus blur', resultsHandler);
  // Hide the result list after a link has been clicked, useful for overlay.
  $results.delegate('li', 'click', resultsClickHandler);
  // Attach hover/active highlight behavior to search result entries.
  $adminMenu.delegate('.admin-menu-search-results li', 'showPath hidePath', highlightPathHandler);
  // Attach the search input event handler.
  $input.bind('keyup search', keyupHandler);
};

/**
 * @} End of "defgroup admin_behaviors".
 */

})(jQuery);
;
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};

/**
 * @ingroup admin_behaviors
 * @{
 */

/**
 * Apply active trail highlighting based on current path.
 *
 * @todo Not limited to toolbar; move into core?
 */
Drupal.admin.behaviors.toolbarActiveTrail = function (context, settings, $adminMenu) {
  if (settings.admin_menu.toolbar && settings.admin_menu.toolbar.activeTrail) {
    $adminMenu.find('> div > ul > li > a[href="' + settings.admin_menu.toolbar.activeTrail + '"]').addClass('active-trail');
  }
};

/**
 * Toggles the shortcuts bar.
 */
Drupal.admin.behaviors.shortcutToggle = function (context, settings, $adminMenu) {
  var $shortcuts = $adminMenu.find('.shortcut-toolbar');
  if (!$shortcuts.length) {
    return;
  }
  var storage = window.localStorage || false;
  var storageKey = 'Drupal.admin_menu.shortcut';
  var $body = $(context).find('body');
  var $toggle = $adminMenu.find('.shortcut-toggle');
  $toggle.click(function () {
    var enable = !$shortcuts.hasClass('active');
    $shortcuts.toggleClass('active', enable);
    $toggle.toggleClass('active', enable);
    if (settings.admin_menu.margin_top) {
      $body.toggleClass('admin-menu-with-shortcuts', enable);
    }
    // Persist toggle state across requests.
    storage && enable ? storage.setItem(storageKey, 1) : storage.removeItem(storageKey);
    this.blur();
    return false;
  });

  if (!storage || storage.getItem(storageKey)) {
    $toggle.trigger('click');
  }
};

/**
 * @} End of "ingroup admin_behaviors".
 */

})(jQuery);
;
