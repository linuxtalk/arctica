<?php

function dupree_core_menu() {
    $items = array();
    //Link to the test_module admin page:
    $items['admin/settings/dupree_core'] = array(
        'title' => 'Dupree Core',
        'description' => 'Administer Dupree Core',
        'page callback' => 'dupree_core_admin_page_view',
        'access arguments' => array('access administration pages'),
        'type' => MENU_NORMAL_ITEM,
    );
    return $items;
}

function dupree_core_admin_page_view() {
    $page_content = '<h2>Dupree Core</h2>';
	$page_content .= drupal_render(drupal_get_form('dupree_core_form'));
    return $page_content;
}

function dupree_core_form() {

	$form['contact_details'] = array(
		'#type' => 'fieldset',
		'#title' => t('Contact Details and Google Map'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	
	//Google Map data
	$form['contact_details']['google_map'] = array(
		'#type' => 'fieldset',
		'#title' => t('Google Map'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form['contact_details']['google_map']['dup_gm_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_gm_enabled', 0),
	);
	$form['contact_details']['google_map']['coords'] = array(
		'#type' => 'fieldset',
		'#title' => t('Coordinates'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
    $form['contact_details']['google_map']['coords']['dup_gm_lat'] = array(
        '#type' => 'textfield',
        '#title' => t('Latitude'),
        '#default_value' => variable_get('dup_gm_lat'),
    );
	$form['contact_details']['google_map']['coords']['dup_gm_lng'] = array(
        '#type' => 'textfield',
        '#title' => t('Longitude'),
        '#default_value' => variable_get('dup_gm_lng'),
    );
	
	$form['contact_details']['google_map']['map_settings'] = array(
		'#type' => 'fieldset',
		'#title' => t('Map Settings'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	
	$form['contact_details']['google_map']['map_settings']['dup_gm_show_location_popup'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Show location popup'),
		'#default_value' => variable_get('dup_gm_show_location_popup', 0),
	);
	
	$form['contact_details']['google_map']['map_settings']['dup_gm_show_driving_link'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Google Map Directions Enabled'),
		'#default_value' => variable_get('dup_gm_show_driving_link', 0),
	);
	$form['contact_details']['google_map']['map_settings']['dup_gm_address_image_url'] = array(
        '#type' => 'textfield',
        '#title' => t('Google Map Address Image'),
        '#default_value' => variable_get('dup_gm_address_image_url'),
    );
	$form['contact_details']['google_map']['map_settings']['dup_gm_zoom_level'] = array(
		'#type' => 'textfield', 
		'#title' => t('Zoom level'),
		'#default_value' => variable_get('dup_gm_zoom_level', 18),
	);
	

	$form['contact_details']['address'] = array(
		'#type' => 'fieldset',
		'#title' => t('Address'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form['contact_details']['address']['dup_gm_title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => variable_get('dup_gm_title'),
    );
	$form['contact_details']['address']['dup_gm_address1'] = array(
        '#type' => 'textfield',
        '#title' => t('Address Line 1'),
        '#default_value' => variable_get('dup_gm_address1'),
    );
	$form['contact_details']['address']['dup_gm_address2'] = array(
        '#type' => 'textfield',
        '#title' => t('Address Line 2'),
        '#default_value' => variable_get('dup_gm_address2'),
    );
	$form['contact_details']['address']['dup_gm_town'] = array(
        '#type' => 'textfield',
        '#title' => t('Town'),
        '#default_value' => variable_get('dup_gm_town'),
    );
	$form['contact_details']['address']['dup_gm_county'] = array(
        '#type' => 'textfield',
        '#title' => t('County'),
        '#default_value' => variable_get('dup_gm_county'),
    );
	$form['contact_details']['address']['dup_gm_pcode'] = array(
        '#type' => 'textfield',
        '#title' => t('Postcode'),
        '#default_value' => variable_get('dup_gm_pcode'),
    );
	$form['contact_details']['address']['dup_gm_country'] = array(
        '#type' => 'textfield',
        '#title' => t('Country'),
        '#default_value' => variable_get('dup_gm_country',"UK"),
    );
	$form['contact_details']['address']['dup_gm_show_location_block'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show location block'),
        '#default_value' => variable_get('dup_gm_show_location_block',0),
    );
	
	/*Open hours*/
	$form['contact_details']['open_hours'] = array(
		'#type' => 'fieldset',
		'#title' => t('Open Hours'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	
	$days = array("Monday","Tuesday","Wednesday","Thursday","Friday");
	foreach ($days as $day) {
		$day_ref = strtolower($day);
		$form['contact_details']['open_hours'][$day_ref] = array(
			'#type' => 'fieldset',
			'#title' => t($day),
			'#collapsible' => FALSE,
			'#collapsed' => FALSE,
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_open_time'] = array(
			'#type' => 'textfield',
			'#title' => t('Open'),
			'#default_value' => variable_get('dup_'.$day_ref.'_open_time',"09:00"),
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_close_time'] = array(
			'#type' => 'textfield',
			'#title' => t('Close'),
			'#default_value' => variable_get('dup_'.$day_ref.'_close',"17:00"),
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_office_open'] = array(
			'#type' => 'checkbox',
			'#title' => t('Office open'),
			'#default_value' => variable_get('dup_'.$day_ref.'_office_open',1),
		);
	}
	
	$days = array("Saturday","Sunday");
	foreach ($days as $day) {
		$day_ref = strtolower($day);
		$form['contact_details']['open_hours'][$day_ref] = array(
			'#type' => 'fieldset',
			'#title' => t($day),
			'#collapsible' => FALSE,
			'#collapsed' => FALSE,
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_open_time'] = array(
			'#type' => 'textfield',
			'#title' => t('Open'),
			'#default_value' => variable_get('dup_'.$day_ref.'_open_time',"00:00"),
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_close_time'] = array(
			'#type' => 'textfield',
			'#title' => t('Close'),
			'#default_value' => variable_get('dup_'.$day_ref.'_close',"00:00"),
		);
		$form['contact_details']['open_hours'][$day_ref]['dup_'.$day_ref.'_office_open'] = array(
			'#type' => 'checkbox',
			'#title' => t('Office open'),
			'#default_value' => variable_get('dup_'.$day_ref.'_office_open',0),
		);
	}
	
	$form['contact_details']['open_hours']['dup_gm_show_open_hours'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show open hours'),
        '#default_value' => variable_get('dup_gm_show_open_hours',0),
    );
	
	
	$form["estate_agency"] = array(
		'#type' => 'fieldset',
		'#title' => t('Estate Agency'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	
	//Vebra Property Search
	$form["estate_agency"]['vebra_search'] = array(
		'#type' => 'fieldset',
		'#title' => t('Vebra Property Search'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form["estate_agency"]['vebra_search']['dup_vebra_search_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_vebra_search_enabled', 0),
	);
	$form["estate_agency"]['vebra_search']['dup_vebra_username'] = array(
        '#type' => 'textfield',
        '#title' => t('Username'),
        '#default_value' => variable_get('dup_vebra_username'),
    );
	$form["estate_agency"]['vebra_search']['dup_vebra_password'] = array(
        '#type' => 'textfield',
        '#title' => t('Password'),
        '#default_value' => variable_get('dup_vebra_password'),
    );
	$form["estate_agency"]['vebra_search']['dup_vebra_datafeed_id'] = array(
        '#type' => 'textfield',
        '#title' => t('Datafeed ID'),
        '#default_value' => variable_get('dup_vebra_datafeed_id'),
    );
	$form["estate_agency"]['vebra_search']['dup_vebra_search_collapsed'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Initially collapsed'),
		'#default_value' => variable_get('dup_vebra_search_collapsed', 1),
	);
	
	//Valuation Request dup_valuation_request_enabled
	$form["estate_agency"]['valuation_request'] = array(
		'#type' => 'fieldset',
		'#title' => t('Valuation Request'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form["estate_agency"]['valuation_request']['dup_valuation_request_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_valuation_request_enabled', 0),
	);
	$form["estate_agency"]['valuation_request']['dup_valuation_request_email'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to email'),
        '#default_value' => variable_get('dup_valuation_request_email'),
    );
	$form["estate_agency"]['valuation_request']['dup_valuation_request_name'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to name'),
        '#default_value' => variable_get('dup_valuation_request_name'),
    );
	
	//Property request
	$form["estate_agency"]['property_alert'] = array(
		'#type' => 'fieldset',
		'#title' => t('Property Alert Request'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form["estate_agency"]['property_alert']['dup_property_alert_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_property_alert_enabled', 0),
	);
	$form["estate_agency"]['property_alert']['dup_property_alert_email'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to email'),
        '#default_value' => variable_get('dup_property_alert_email'),
    );
	$form["estate_agency"]['property_alert']['dup_property_alert_name'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to name'),
        '#default_value' => variable_get('dup_property_alert_name'),
    );
	
	//Contact details
	$form['contact_details']['contact_form'] = array(
		'#type' => 'fieldset',
		'#title' => t('Contact Form'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form['contact_details']['contact_form']['dup_contact_form_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_contact_form_enabled', 0),
	);
	$form['contact_details']['contact_form']['dup_contact_form_email'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to email'),
        '#default_value' => variable_get('dup_contact_form_email'),
    );
	$form['contact_details']['contact_form']['dup_contact_form_name'] = array(
        '#type' => 'textfield',
        '#title' => t('Send to name'),
        '#default_value' => variable_get('dup_contact_form_name'),
    );
	
	
	/*Twitter API*/
	$form['twitter_api'] = array(
		'#type' => 'fieldset',
		'#title' => t('Twitter Post'),
		'#collapsible' => TRUE,
		'#collapsed' => TRUE,
	);
	$form['twitter_api']['dup_twitter_post_enabled'] = array(
		'#type' => 'checkbox', 
		'#title' => t('Enabled'),
		'#default_value' => variable_get('dup_twitter_post_enabled', 0),
	);
	
	$form['twitter_api']['dup_twitter_url'] = array(
        '#type' => 'textfield',
        '#title' => t('Site URL'),
        '#default_value' => variable_get('dup_twitter_url'),
    );
	
	$form['twitter_api']['dup_twitter_api_key'] = array(
        '#type' => 'textfield',
        '#title' => t('API Key'),
        '#default_value' => variable_get('dup_twitter_api_key'),
    );
	$form['twitter_api']['dup_twitter_api_secret'] = array(
        '#type' => 'textfield',
        '#title' => t('API secret'),
        '#default_value' => variable_get('dup_twitter_api_secret'),
    );
	$form['twitter_api']['dup_twitter_access_token'] = array(
        '#type' => 'textfield',
        '#title' => t('Access token'),
        '#default_value' => variable_get('dup_twitter_access_token'),
    );
	$form['twitter_api']['dup_twitter_access_token_secret'] = array(
        '#type' => 'textfield',
        '#title' => t('Access token secret'),
        '#default_value' => variable_get('dup_twitter_access_token_secret'),
    );
	$form['twitter_api']['content_types']  = array(
		'#type' => 'fieldset',
		'#title' => t('Content Types'),
		'#collapsible' => TRUE,
		'#collapsed' => FALSE,
	);
	
	$sql = "select * from node_type where disabled=0";
	$query = db_query($sql);
	while ($result = $query->fetchAssoc()) {
		$fieldname = "dup_".$result["type"];
		$form['twitter_api']['content_types'][$fieldname] = array(
			'#type' => 'checkbox', 
			'#title' => t($result["name"]),
			'#default_value' => variable_get($fieldname, 0),
		);
	}
	
	
	
	
    //Submit button:
    $form['submit'] = array(
        '#type' => 'submit',
        '#value' => t('Save Core Data'),
    );
    return $form;
	
}

function dupree_core_form_submit($form, &$form_state) {
	//Google map parameters
	variable_set('dup_gm_enabled', $form_state['values']['dup_gm_enabled']);
	variable_set('dup_gm_lat', $form_state['values']['dup_gm_lat']);
	variable_set('dup_gm_lng', $form_state['values']['dup_gm_lng']);
	
	variable_set('dup_gm_title', $form_state['values']['dup_gm_title']);
	variable_set('dup_gm_address1', $form_state['values']['dup_gm_address1']);
	variable_set('dup_gm_address2', $form_state['values']['dup_gm_address2']);
	variable_set('dup_gm_town', $form_state['values']['dup_gm_town']);
	variable_set('dup_gm_county', $form_state['values']['dup_gm_county']);
	variable_set('dup_gm_pcode', $form_state['values']['dup_gm_pcode']);
	variable_set('dup_gm_country', $form_state['values']['dup_gm_country']);
	variable_set('dup_gm_show_driving_link', $form_state['values']['dup_gm_show_driving_link']);
	variable_set('dup_gm_address_image_url', $form_state['values']['dup_gm_address_image_url']);
	variable_set('dup_gm_show_location_popup', $form_state['values']['dup_gm_show_location_popup']);
	variable_set('dup_gm_zoom_level', $form_state['values']['dup_gm_zoom_level']);
	variable_set('dup_gm_show_location_block', $form_state['values']['dup_gm_show_location_block']);
	
	/*Open hours*/
	$days = array("monday","tuesday","wednesday","thursday","friday","saturday","sunday");
	foreach($days as $day){
		variable_set('dup_'.$day.'_open_time', $form_state['values']['dup_'.$day.'_open_time']);
		variable_set('dup_'.$day.'_close_time', $form_state['values']['dup_'.$day.'_close_time']);
		variable_set('dup_'.$day.'_office_open', $form_state['values']['dup_'.$day.'_office_open']);
	}
	variable_set('dup_gm_show_open_hours', $form_state['values']['dup_gm_show_open_hours']);

	//Vebra parameters
	variable_set('dup_vebra_search_enabled', $form_state['values']['dup_vebra_search_enabled']);
	variable_set('dup_vebra_username', $form_state['values']['dup_vebra_username']);
	variable_set('dup_vebra_password', $form_state['values']['dup_vebra_password']);
	variable_set('dup_vebra_datafeed_id', $form_state['values']['dup_vebra_datafeed_id']);
	variable_set('dup_vebra_search_collapsed', $form_state['values']['dup_vebra_search_collapsed']);
	
	//Valuation request parameters
	variable_set('dup_valuation_request_enabled', $form_state['values']['dup_valuation_request_enabled']);
	variable_set('dup_valuation_request_email', $form_state['values']['dup_valuation_request_email']);
	variable_set('dup_valuation_request_name', $form_state['values']['dup_valuation_request_name']);
	
	//Property alert request parameters
	variable_set('dup_property_alert_enabled', $form_state['values']['dup_property_alert_enabled']);
	variable_set('dup_property_alert_email', $form_state['values']['dup_property_alert_email']);
	variable_set('dup_property_alert_name', $form_state['values']['dup_property_alert_name']);
	
	//Contact form parameters
	variable_set('dup_contact_form_enabled', $form_state['values']['dup_contact_form_enabled']);
	variable_set('dup_contact_form_email', $form_state['values']['dup_contact_form_email']);
	variable_set('dup_contact_form_name', $form_state['values']['dup_contact_form_name']);
	
	//Twitter API
	variable_set('dup_twitter_post_enabled', $form_state['values']['dup_twitter_post_enabled']);
	variable_set('dup_twitter_api_key', $form_state['values']['dup_twitter_api_key']);
	variable_set('dup_twitter_api_secret', $form_state['values']['dup_twitter_api_secret']);
	variable_set('dup_twitter_access_token', $form_state['values']['dup_twitter_access_token']);
	variable_set('dup_twitter_access_token_secret', $form_state['values']['dup_twitter_access_token_secret']);
	
	$sql = "select * from node_type where disabled=0";
	$query = db_query($sql);
	while ($result = $query->fetchAssoc()) {
		$fieldname = "dup_".$result["type"];
		variable_set($fieldname, $form_state['values'][$fieldname]);
	}
	variable_set('dup_twitter_url', $form_state['values']['dup_twitter_url']);
	

    drupal_set_message(t('The Dupree Core data has been saved'));
}
