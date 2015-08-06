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
