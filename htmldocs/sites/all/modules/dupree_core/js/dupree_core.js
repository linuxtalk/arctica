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
