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
