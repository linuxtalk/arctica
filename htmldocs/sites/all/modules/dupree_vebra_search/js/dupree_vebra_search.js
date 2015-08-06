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
