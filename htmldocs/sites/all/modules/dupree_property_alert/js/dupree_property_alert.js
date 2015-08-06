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
