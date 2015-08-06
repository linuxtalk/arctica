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
