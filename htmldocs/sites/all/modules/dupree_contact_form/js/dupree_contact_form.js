(function ($) {	
	$(document).ready(function() {
		$("div.dupree_contact_form form button").click(function(event){
			event.preventDefault();

			$("div.dupree_contact_form form").send_email_from_form();
			
		});
	});
})(jQuery);
