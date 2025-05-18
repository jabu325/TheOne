// Custom Popper.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    bootstrap.Dropdown.Default.popperConfig = { strategy: "fixed" };
});


// ###################################################
// Modals
// ###################################################






$(document).ready(function(){


/*
	window.confirm = function(msg) {
		
		var clickresult;

		 $.confirm({
			title: "Are you sure?",
			theme: "bootstrap",
			animateFromElement: false,
			animation: 'scale',
			content: msg,

		
			
			buttons: {
				confirm: {
					text: "Ok",
					btnClass: 'btn-green',
					action: function(){
					
					
					}
				},
				cancel: {
					text: "Cancel",
					btnClass: 'btn-outline-secondary',
					action: function(){

					
				
					
					}
				}
			  
			}
		});
	
	
	 };
	*/

	$(".setting-reset-default-link").on("click", function(e){

		console.log("click");

		var setting_selector = $(this).data("setting-selector");
		var default_value = $("."+setting_selector).data("default-value");
		$("."+setting_selector).val(default_value);

	});
	 

	$('body').on('hidden.bs.modal', '.modal', function() {
       // Check if the ID of the modal is not 'global-search'
        if ($(this).attr('id') !== 'global-search') {
            $(this).remove();
        }
	});


    var isModalLoading = false;

	$('body').on('click', '.modal-link', function(event){
		event.preventDefault();


        if (isModalLoading) {
            return;
        }

        isModalLoading = true;


		$('#modal-holder').load($(this).attr('href'),function(){
			var myModal = new bootstrap.Modal(document.getElementById('modal'), {
			keyboard: false,
			focus: false,
			backdrop: 'static'
		});
		$('.ajaxform').ajaxForm();

		$('.selectpicker').selectpicker({
			width: 'auto'
		});
	
		$('.ajaxform-image').ajaxForm();

	

		myModal.show();
        isModalLoading = false;
	});

	

	});


	$('body').on('shown.bs.modal', '.modal', function() {
		$('.autofocus-modal').focus();

		(() => {
			'use strict'
		
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			const forms = document.querySelectorAll('.needs-validation')
		
			// Loop over them and prevent submission
			Array.from(forms).forEach(form => {
			form.addEventListener('submit', event => {
				if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
				}
		
				form.classList.add('was-validated')
			}, false)
			})
		})()

		
	});



	$('body').on('click', '.modal-link-image', function(){
		event.preventDefault();

		$('#modal-holder-image').load($(this).attr('href'),function(){
			var myModalimage = new bootstrap.Modal(document.getElementById('modal-image'), {
				keyboard: false,
				focus: false,
				backdrop: 'static'
		});
		myModalimage.show();
		$('.ajaxform').ajaxForm();
		$('.ajaxform-image').ajaxForm();
		$('.modal-backdrop:last').addClass('modal-image-backdrop');
	});
  
  
	});


// Character account update
$('body').on('keyup','.char-count-enabled',function(){

	$(this).closest(".settings-section-setting").find('.char-count-number').html($(this).val().length);
});




// ###################################################
// Poper tooltips
// ###################################################

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl,
	{
	
		trigger: 'hover'
	  }
	  )
})

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl, 
    
    // Options
    {
      html: true,
      placement: 'bottom',
	  trigger: 'hover'
    }

  )
})

});


// ###################################################
// Copy to clipboard
// ###################################################
$(document).ready(function(){
    $('body').on('click','.copyme', function(e) {
        e.preventDefault();

        
        if(typeof $(this).attr('data-copy-text') !== "undefined" && $(this).attr('data-copy-text').length > 0){
            var copyText = $(this).attr('data-copy-text'); 
        } else {
            var copyText = $(this).text(); 
        }

        var textarea = document.createElement("textarea");
        textarea.textContent = copyText;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy"); 
        
        if(typeof $(this).attr('data-copy-direction') !== "undefined" &&  $(this).attr('data-copy-direction').length > 0){
            var copyDirection = $(this).attr('data-copy-direction');
            
        } else {
            var copyDirection = "right";

        }


        
        $(this).append('<span class="small copied-' + copyDirection + '">Copied</span>');
      

        
        $(this).children('span').fadeOut(1500);

        document.body.removeChild(textarea);
    })
});

// ###################################################
// Tooltips and popovers
// ###################################################
$(document).ready(function(){
	$('body').tooltip({ selector: '.tooltipme', trigger: 'hover', placement: 'bottom'});

  
	$('html').popover({ selector: '.popoverme'})	
});





// ###################################################
// Confirm class
// ###################################################
$(document).ready(function(){

	$("body").on('click',".confirmme", function (e) {

		/*
		
		If you add the following data attributes to the anchor tag you can control elements of the confirm dialog:
	
		confirm-content: the main content in the dialog
		confirm-title: the title of the dialog
		confirm-btn: the text on the confirm button
		cancel-btn: the text on the cancel button
	
		They should follow standard data attribute syntax eg: data-confirm-title="Delete Burger?"
	
		*/ 
		
	
		e.preventDefault();
	
		var clickedelem = $(this);
		if ($(this).attr('type') == "submit") {
			var form = true;
			$(this).closest("form").submit(function(e){
				e.preventDefault();
			});
		}
		var confirmtext = "Are you sure you want to do this?";
		var confirmtitle = "Are you sure?";
		var confirmbtn = "Confirm";
		var cancelbtn = "Cancel";
		var href = $(this).attr('href')
	
		if ($(this).data('confirm-title') && $(this).data('confirm-title') != "") {
			confirmtitle = $(this).data('confirm-title');
		}
	
		if ($(this).data('confirm-content') && $(this).data('confirm-content') != "") {
			confirmtext = $(this).data('confirm-content');
		}
	
		if ($(this).data('cancel-btn') && $(this).data('cancel-btn') != "") {
			cancelbtn = $(this).data('cancel-btn');
		}
	
		if ($(this).data('confirm-btn') && $(this).data('confirm-btn') != "") {
			confirmbtn = $(this).data('confirm-btn');
		}
	

		if(clickedelem.data("confirm-disable") == true){
			clickedelem.attr("disabled","disabled");
		}

		if(!$(".jconfirm").length) { 
	
		  $.confirm({
			title: confirmtitle,
			theme: "bootstrap",
			scrollToPreviousElement: false, 
    		scrollToPreviousElementAnimate: false, 
			animateFromElement: false,
			animation: 'scale',
			content: confirmtext,
			buttons: {
				confirm: {
					text: confirmbtn,
					btnClass: 'btn-green',
					action: function(){
					

						


						if(clickedelem.data("confirm-type") == "ajax"){
	
							$.get(href, function(data){
								if(clickedelem.data("confirm-fade") != ""){;
									$(clickedelem.data("confirm-fade")).fadeOut('slow',function(){
										$(this).remove();
									});
								}
							});
							
						} else if(clickedelem.data("confirm-type") == "static"){
							// just confirming a local action which does not db updating
						
							if(clickedelem.data("confirm-fade") != ""){;
								$(clickedelem.data("confirm-fade")).fadeOut('slow',function(){
									$(this).remove();
								});
							}
						
						} else if(clickedelem.data("confirm-type") == "submitform"){

							$(clickedelem.data("confirm-submitform")).submit();
							
						} else if(form){
							clickedelem.closest('form').unbind( "submit" );
							clickedelem.closest('form').submit();
						} else {
							window.location.href = href;
						}
					}
				},
				cancel: {
					text: cancelbtn,
					btnClass: 'btn-outline-secondary',
					action: function(){
						if(clickedelem.data("confirm-disable") == true){
							clickedelem.removeAttr("disabled");
						}
					}
				}
			  
			}
		});
	
	}
	
		});
});

// ###################################################
// Pages order (Chris)
// ###################################################
function generateJSONPageStructure(){

	var page_structure_object = new Map();

	//this will loop through each nav
	$(".primarypagelist").each(function(id, ul) {
		var current_nav_id = $(this).data("navid");
		
		//loop through each parent page if th nav has pages
		if($(this).has("li")){
			//parent page loop
			var parent_page_structure_object = new Map();
			$(this).children("li").each(function(id, li) {
				//add parent page to array
				var curr_parent_page_id = $(this).data("pageid");
				parent_page_structure_object.set(curr_parent_page_id, 0);
				//loop through sub pages if it has pages
				if($(this).has("ul")){
					var sub_page_structure_object = new Map();
					$(this).children("ul").children("li").each(function(id, li) {
						var curr_sub_page_id = $(this).data("pageid");
						sub_page_structure_object.set(curr_sub_page_id, 0);
						
						//grandchild page check
						if($(this).has("ul")){
							var grand_child_page_object = new Map();
							$(this).children("ul").children("li").each(function(id, li) {
								var curr_grandchild_page_id = $(this).data("pageid");
								grand_child_page_object.set(curr_grandchild_page_id, 0);
							});
							sub_page_structure_object.set(curr_sub_page_id, grand_child_page_object);
						}

					});
					parent_page_structure_object.set(curr_parent_page_id, sub_page_structure_object);
				}
			});
			page_structure_object.set(current_nav_id, parent_page_structure_object);
		}
	});

	//console.log(JSON.stringify(page_structure_arr));


	return JSON.stringify(page_structure_object, replacer);

}


// ###################################################
// Pages order welcomepack
// ###################################################
function generateJSONWelcomePageStructure(){

	var page_structure_object = new Map();

	//this will loop through each nav
	$(".primarypagelist").each(function(id, ul) {
	
		//loop through each parent page if th nav has pages
		if($(this).has("li")){
			//parent page loop
			var parent_page_structure_object = new Map();
			$(this).children("li").each(function(id, li) {
				//add parent page to array
				var curr_parent_page_id = $(this).data("id");
				parent_page_structure_object.set(curr_parent_page_id, 0);
				//loop through sub pages if it has pages
				if($(this).has("ul")){
					var sub_page_structure_object = new Map();
					$(this).children("ul").children("li").each(function(id, li) {
						var curr_sub_page_id = $(this).data("id");
						sub_page_structure_object.set(curr_sub_page_id, 0);
						
						//grandchild page check
						if($(this).has("ul")){
							var grand_child_page_object = new Map();
							$(this).children("ul").children("li").each(function(id, li) {
								var curr_grandchild_page_id = $(this).data("id");
								grand_child_page_object.set(curr_grandchild_page_id, 0);
							});
							sub_page_structure_object.set(curr_sub_page_id, grand_child_page_object);
						}

					});
					parent_page_structure_object.set(curr_parent_page_id, sub_page_structure_object);
				}
			});
			page_structure_object.set(0, parent_page_structure_object);
		}
	});

	//console.log(JSON.stringify(page_structure_arr));


	return JSON.stringify(page_structure_object, replacer);

}



function replacer(key, value) {
  if(value instanceof Map) {
    return Array.from(value.entries());// or with spread: value: [...value]
    
  } else {
    return value;
  }
}


function list_values(ullist){
		
	
	
	let list = new Array();
	let i = 0;
	ullist.children('li').each(function( index ) {
		if($( this ).data('multivaluelist-value') != ""){
			list[i] = $( this ).data('multivaluelist-value');
			
			i++;
		}
	});

	type = ullist.data("type");
	
	settinginput = ullist.closest('.setting-multivaluelist').children('.multivaluelist-value');

	if(type == "csv"){
		settinginput.val(list.toString().slice());
	} else if(type == "mattson"){
		settinginput.val(list.join("@@@@@"));
	}else if(type == "json"){
		settinginput.val(JSON.stringify(list));
	}
};


// ###################################################
// multivaluelist list - settings
// ###################################################
$(document).ready(function(){

	$('body').on("click", '.multivaluelist-add', function(){
		
		if($(this).prev('.multivaluelist-add-value').val() != ""){
			ullist = $(this).parent().parent().find('ul');

			if($(this).prev('.multivaluelist-add-value ').find(':selected').data("name") != "" && $(this).prev('.multivaluelist-add-value').find(':selected').data("name") != undefined){
				appendname = $(this).prev('.multivaluelist-add-value').find(':selected').data("name");
			} else {
				appendname = $(this).prev('.multivaluelist-add-value').val();
			}
			ullist.append('<li class="list-inline-item badge rounded bg-secondary small fw-normal text-wrap px-3 d-flex align-items-center" data-multivaluelist-value="' + $(this).prev('.multivaluelist-add-value').val() + '"><span>' + appendname  + '</span> <a class="multivaluelist-remove ps-3"  href="javascript://"><i class="fa-solid fa-xmark text-white ms-1"></i></a></li>');
			$(this).prev('.multivaluelist-add-value').val('');

			list_values(ullist)

			$('body').on("click",'.multivaluelist-remove',function(){
															
				ullist = $(this).closest('ul');

				$(this).closest('li').fadeOut('slow',function(){
					$(this).remove();
					list_values(ullist);

				});

			})
		}
	});

	// remove li
	$('body').on("click",'.multivaluelist-remove',function(){
														
		ullist = $(this).closest('ul');

		$(this).closest('li').fadeOut('slow',function(){
			$(this).remove();
			list_values(ullist);

		});

	})


	//makes checkboxes single select
	$('body').on("click",'.checkbox-singleselect input',function(){

		$('#settingssectionsetting-' + $(this).closest('.setting-checkboxes').data("settingssectionsetting") + ' input').prop( "checked", false );
		$(this).prop( "checked", true );
	});


	


});
  


// ###################################################
// Setting collection toggle ons and offs (select)
// ###################################################


$(document).ready(function(){	



	$('body').on('change',' .settings-group select',function(){
		if(!$(this).children('option:selected').attr("data-toggle-offs")) return false;
		togglehides = $(this).children('option:selected').data("toggle-offs").split(',');
		$.each(togglehides,function(){
			$('#settings-section-' + this).hide();
		})
	})


	$('body').on('change',' .settings-group select',function(){
		if(!$(this).children('option:selected').attr("data-toggle-ons")) return false;
		toggleshows = $(this).children('option:selected').data("toggle-ons").split(',');
		$.each(toggleshows,function(){
			$('#settings-section-' + this).show();
		})
	})



});



// ###################################################
// Setting collection toggle ons and offs (radios / checkboxes)
// ###################################################


$(document).ready(function(){	







	$('body').on('change','.settings-group input',function(){
		if(!$(this).attr("data-toggle-offs")) return false;
		if($(this).is(":checked")){
			togglehides = $(this).data("toggle-offs").split(',');
			$.each(togglehides,function(){
				$('#settings-section-' + this).hide();
			})
		}
	})


	$('body').on('change','.settings-group input',function(){
		
		if(!$(this).attr("data-toggle-ons")) return false;
		if($(this).is(":checked")){
			toggleshows = $(this).data("toggle-ons").split(',');
			$.each(toggleshows,function(){
				$('#settings-section-' + this).show();
			})
		}

	})
	

})



// ###################################################
// Form switch / toggle - Settings
// ###################################################
$(document).ready(function(){

	

		$('body').on('click','.form-check-input',function(){


		var toggle = $(this);

		if(toggle.prop("checked")){

			$('#toggle-hidden-input-' + toggle.data("setting-uid")).val(toggle.data("on"));
		} else {
			$('#toggle-hidden-input-' + toggle.data("setting-uid")).val(toggle.data("off"));
		}

		// toggles visability of setting sections
		if( $(this).data("settings-sections-toggle") &&  $(this).data("settings-sections-toggle") != ""){
			var settings_sections_toggles = $(this).data("settings-sections-toggle").split(",");
			var settings_section_uid = $(this).data("settings-section-uid");
			$.each(settings_sections_toggles,function(i){
				if(toggle.prop("checked")){
					$('#settings-section-' + settings_sections_toggles[i]).fadeIn('slow');
					
					
				} else {
					$('#settings-section-' + settings_sections_toggles[i]).fadeOut('slow');
				}
			})
		}

		// toggles visability of specific ids and classes 
		if( $(this).data("settings-sections-toggle-ids-and-classes") && $(this).data("settings-sections-toggle-ids-and-classes") != ""){
			var settings_sections_toggles = $(this).data("settings-sections-toggle-ids-and-classes").split(",");
			var settings_section_uid = $(this).data("settings-section-uid");
			$.each(settings_sections_toggles,function(i){
				if(toggle.prop("checked")){

					$(settings_sections_toggles[i]).fadeIn('slow');
					
					
				} else {

					$(settings_sections_toggles[i]).fadeOut('slow');
				}
			})
		}

	});

	// Checks if last div is admin, if so it adds a class to the bottom rounded corener div
	$('.settings-section-admin').next('.setting-section-last').addClass('settings-section-admin');

});


// ###################################################
// Alignment controls
// ###################################################
$(document).ready(function(){

	// Alignment controls
	$( "body" ).on("click",".alignmentbutton",function() {
		//remove class from all other alignment buttons in this set
		$('#F' + $(this).data('pagesection') + '_Align' + $(this).data('col') + ' a').removeClass('active'); 

		//adds active class to selected alignment
		$(this).addClass('active');  

		//applies CSS styles to input elements
		$('.F' +  $(this).data('pagesection') + '_Value' +  $(this).data('col') + ' textarea, .F' + $(this).data('pagesection')  + '_Value' + $(this).data('col') + ' input').css('text-align', $(this).data('align')); 
		
		//applies class to input elements
		$('.F' +  $(this).data('pagesection') + '_Value' +  $(this).data('col') + ' textarea, .F' + $(this).data('pagesection')  + '_Value' + $(this).data('col') + ' input').removeClass('text-left text-right text-center text-start text-end text-justify').addClass($(this).data('alignclass')); 

		//set the class which should be saved
		$('.F' +  $(this).data('pagesection') + '_Value_Class' +  $(this).data('col')).val($(this).data('alignclass'));
	});

});



// ###################################################
// Filestore remove 
// ###################################################
$(document).ready(function(){

	$( "body" ).on("click",'.filestore-remove',function() {
		if(confirm('Are you sure you want to remove this file?')){

				$('#filestore-item-' + $(this).data("id")).fadeOut('slow',function(){
					$(this).remove();

				});
			
				$.get('actions/filestore-remove?id=' + $(this).data("id"), function(){
				$.post("includes/filestore-usage-progressbar.php", {}, function(data){ 
					$("#filestore-usage-progressbar").html(data);
				});  
			});
			
		} else {
			return false;
		}
	});

});



// ###################################################
// user site bookmark remove 
// ###################################################
$(document).ready(function(){

	$( "body" ).on("click",'.bookmark-remove',function() {
	
        var site_uid = $(this).data("site-uid");
        var bookmark_uid = $(this).data("bookmark-uid");

            $('#bookmark-' + bookmark_uid).fadeOut('slow',function(){
                $(this).remove();
                $.get('actions/user-site-bookmark?task=removebysiteuid&site_uid=' + site_uid, function(){
                  

                    // if last bookmark remove the edit button
                    $.get('actions/user-site-bookmark?task=getcount', function(data){
                        if(data == 0){
                            $('#bookmarks-edit').hide();
                            updateUserSiteBookmarks();
                        } else {
                            $('#bookmarks-edit').show();
                        }

                    });

                    // update hub bookmark icon

                    if($("#user-site-bookmark-button-" + site_uid).data("task") == "add"){
                        $("#user-site-bookmark-button-" + site_uid).data("task","remove");
                        $("i","#user-site-bookmark-button-" + site_uid).removeClass("fa-light");
                        $("i","#user-site-bookmark-button-" + site_uid).addClass("fa-solid");
                    } else {
                        $("#user-site-bookmark-button-" + site_uid).data("task","add");
                        $("i","#user-site-bookmark-button-" + site_uid).removeClass("fa-solid");
                        $("i","#user-site-bookmark-button-" + site_uid).addClass("fa-light");
                    }


                });
               

            });
        
            
        
		
	});

});


// ###################################################
// Loading function
// ###################################################
$(document).ready(function(){
	$('body').on("submit.buttonload",'form',function(){

		var originaltext = $(this).find(':submit').html();
		if($(this).find(':submit').data("loading-text") != null){
			var dataloadingtext = $(this).find(':submit').data("loading-text");
		} else {
			var dataloadingtext = "Updating...";
		}
		$(this).find(':submit').html(dataloadingtext);
		
		$(this).find(':submit').attr("disabled","disabled");
	
		if($(this).hasClass('ajaxform')){
			var form = $(this);
			setTimeout(function () {
				if(form.data("modal-no-close") != "1"){
					$('#modal').modal('hide');
					$('#modal2').modal('hide');
				}
				$(form).find(':submit').html(originaltext);
				$(form).find(':submit').removeAttr("disabled");
			}, 1000)  

		}

		if($(this).hasClass('ajaxform-image')){
			var form = $(this);
			setTimeout(function () {
				if(form.data("modal-no-close") != "1"){
					$('#modal-image').modal('hide');
				}
				$(form).find(':submit').html(originaltext);
				$(form).find(':submit').removeAttr("disabled");
			}, 1000)  

		}


	
	})

});


// ###################################################
// Enables ajax on forms function
// ###################################################
$(document).ready(function(){
	$('.ajaxform').ajaxForm();
	$('.ajaxform-image').ajaxForm();
});


// ###################################################
// Sticky submit button on forms function
// ###################################################

//Set form target by adding data-form-target="FORMID"
$(document).ready(function(){
			
	$("body").on("click",".stickybutton",function(){
	

		var originaltext = $(this).html();
		console.log($(this).html());
		if($(this).data("loading-text") != null){
			var dataloadingtext = $(this).data("loading-text");
		} else {
			var dataloadingtext = "Updating...";
		}
		$(this).html(dataloadingtext);

		$(this).attr("disabled","disabled");
	

		if($(this).data("form-target") && $(this).data("form-target") != ""){
			targetform = $("#" + $(this).data("form-target"));
		} else {
			targetform = $(this).closest('form');
		}

	

		if($(this).data("button-target")){
			submitbutton = $("#" + $(this).data("button-target"));
		} else {
			submitbutton =  $(this).closest('form').find('button[type="submit"]');
		}
		submitbutton.click();


		
		var button = this;
		setTimeout(function () {
			if(!submitbutton.is(":disabled")){
				$(button).html(originaltext);
				$(button).removeAttr("disabled");
			}
		}, 1500)  

		
	
	})
		
});



// ###################################################
// Confirm remove page
// ###################################################
function confirmremovepage(x){
	$.get('actions/page-checkifsubs?id=' + x, function(data){ 
		
	if(data == 0){
		if (confirm("Do you really want to remove this page? ")){
			
			$.get('actions/page-check-removable?id=' + x, function(data){ 

			if(data == 0){	
				$.get('actions/page', { task: 'remove', id : x});
				$('#page_' + x).fadeOut('slow');
			} else {
				alert("This page cannot be removed as removal protection is enabled.");	
			}

			});

		}
	} else {
		alert("You cannot remove this page as it has sub pages. Delete these pages first.");
	}

	});
}


// ###################################################
// Confirm remove nav
// ###################################################
function confirmremovenav(x){
	
	$.get('actions/navigation?task=haspages&id=' + x, function(data){ 
		
	if(data == 0){
		if (confirm("Do you really want to remove this navigation?")) {
			$.get('actions/navigation', {task: 'remove', id : x},function(){$('#navetitle' + x).fadeOut('slow')});
			return true;
		} else {
			return false;
		}
	} else {
		alert("You cannot remove this navigation as it has pages under it. Delete or move all pages on this navigation before trying to remove it.");
		return false;
	}

	});
}



// ###################################################
// Expand textarea - Settings
// ###################################################
$(document).ready(function(){
	$('body').on('click', '.expand a', function () {
		event.preventDefault();
		$(this).closest('.setting-textarea').find('.form-control').toggleClass('expand-me');
		// toggle text from expand to collapse
		if($(this).text() == "Expand"){
			$(this).html("<i class='fa-regular fa-compress-wide me-1'></i>Collapse");
		} else {
			$(this).html("<i class='fa-regular fa-expand-wide me-1'></i>Expand");
		}
	})
});



// ###################################################
// Colour picker show on clicking no colour div
// ###################################################

$(document).ready(function(){
	$('body').on('click','.transparent-color',function(){
		$(this).hide();
		$(this).next().show();

		// set input value to black to match opened picker
		$(this).next().next().val('#000000');

		// trigger colour picker from transparent div
		event.preventDefault();
		$(this).next().click();
	})
});


// ###################################################
// Colour picker hex output
// ###################################################
$(document).ready(function(){

	// copy hex value to input
	$('body').on('input', '.form-control-color', function() {
		$(this).next().val(this.value);
	});

	
	$('body').on('input', '.hex-colour', function() {

		hexVal = $(this).val();

		if(hexVal == ""){
			$(this).prev().prev().show();
			$(this).prev("input").hide();
		}  else {
			$(this).prev().prev().hide();
			$(this).prev("input").show();
		}


		// add hash if missing
		if(hexVal.charAt(0) != "#" && this.value.length > 0){
			$(this).val('#' + $(this).val());
		}


		// prevent multiple hashes
		hexVal.replace('##','#');
		
		
		// adding missing chaacters if only 3 are used, E.x. FFF = FFFFFF
		if(hexVal.length == 4){
			char1 = hexVal.charAt(1);
			char2 = hexVal.charAt(2);
			char3 = hexVal.charAt(3);
			fullHex = "#" + char1 + char1  + char2 + char2 + char3 + char3;
			$(this).prev().val(fullHex);

		} else {
			$(this).prev().val(hexVal);

		}
		
	});
	
});


// ###################################################
// Enable toasts
// ###################################################
$(document).ready(function(){
	var option = [];
	var toastElList = [].slice.call(document.querySelectorAll('.toast'))
	var toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl, option)
	})
	
	$('.toast').toast('show');

	$("body").on("hidden.bs.toast", '.toast', function(){
		
		$(this).remove();
	     
    });
})

// ###################################################
// remove lister items
// ###################################################
$(document).ready(function(){
	$('body').on('click','.lister-item-remove',function(){
		item = $(this);
		if(confirm('Are you sure you wish to remove this item?')){
		
			$.get('actions/lister-item-remove', { id : $(this).data("item-id")},function(){
				$('#lrow_' +  item.data("item-id")).fadeOut('slow',function(){
					$(this).remove();
				});
				});
		}
	})
})

// ###################################################
// remove structural items
// ###################################################
$(document).ready(function(){
	$('body').on('click','.structure-item-remove',function(){
		item = $(this);
		if(confirm('Are you sure you wish to remove this item?')){
		
			$.get('actions/sitestructuralelement', { task: 'remove', location:  $(this).data("location"), eid : $(this).data("item-id")},function(){
				$('#eid' +  item.data("item-id")).fadeOut('slow',function(){
					$(this).remove();
				});
				});
		}
	})
})


// ###################################################
// remove lister images
// ###################################################
$(document).ready(function(){
	$('body').on('click','.item-image-remove',function(){
		if(confirm("Do you really want to remove this image?")){
			image_id = $(this).data("image-id");
			primary = $(this).data("primary") ;
			$.get('actions/thumbnail-image-remove',{ 'lid' : $(this).data("item-id"),'primary' : $(this).data("primary"), 'page_id' : $(this).data("page-id"), 'iid' : $(this).data("image-id")}, function(){
				console.log(primary);
				if(primary){
					console.log("reload");
					location.reload();
				} else {
					$('#image_' + image_id).fadeOut('slow')
				}
			});
		} else {
			return false;
		}
	})
})


// ###################################################
// global search
// ###################################################

$(document).ready(function() {
	let template_global_search;
	if($("#global-search-string").length){
		// loads template once
		$.ajax({
			url: "mustache/templates?template=globalsearch", 
			success : function( templates) {
						template_global_search = $(templates).filter("#global-search-template").html();
					}
		});


		$("#global-search-string").autocomplete({
		source: function(request, response) {
				$.ajax({
				url: "actions/global-search",
				type: "get",
				dataType: "json",
				data: {
						term: request.term
				},
				success: function(data) {
						response(jQuery.map(data, function(item) {
						return {
							url: item.url,
							value: item.name,
							type: item.type,
							icon: item.icon,
							id: item.id,
							uid: item.uid
						}				 
						}))
				}			
				}) 
		},
		autoFocus: true,
		select: function( event, ui ) {
				window.location.href = ui.item.url;
			},
		minLength: 2
		}).autocomplete("instance")._renderItem = function( ul, data ) {

			html = Mustache.render(template_global_search, data);
					
			return $( "<li>" ).append(html).appendTo( ul );
		
		};

		$("#global-search-string").autocomplete("widget").addClass( "dropdown-menu" );

		$("#global-search-string").keypress(function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13) { //Enter keycode
				return false;
			}
		});
	}

});


// Reset global search input text on close
$(document).ready(function() {
	$('body').on('hidden.bs.modal', '#global-search', function (e) {
		$('#global-search-string').val('');
	})
});


// enables BS validation
$(document).ready(function() {
	(() => {
		'use strict'
	
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.querySelectorAll('.needs-validation')
	
		// Loop over them and prevent submission
		Array.from(forms).forEach(form => {
		form.addEventListener('submit', event => {
			if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
			}
	
			form.classList.add('was-validated')
		}, false)
		})
	})()
});


// ###################################################
// Welcome Pack radio section selects
// ###################################################
$(document).ready(function() {
	$('body').on("change",'.wp-selects input[type="radio"]',function() {
		var id = $(this).data('id');
		$('.wp-selects-target').hide(); // hide all
		$('#' + id).show();
	});
});


// enables selecting all checkbox with a class of selectallgroup

$(document).ready(function() { 

	var SelectAllFirstTime = true;
	$('body').on('click','.selectall', function(){
		var checkBoxes = $('.selectallgroup');
		if(SelectAllFirstTime == true){
			checkBoxes.prop("checked", false);
		SelectAllFirstTime = false;
		}
		
		checkBoxes.prop("checked", !checkBoxes.prop("checked"));
			
	});	

});
	


// WF SMS scipts


	

function charcount(y){
	y = typeof y !== 'undefined' ? y : "";
	
	$('#charcount' + y).text($('.textmessagearea' + y).val().length);
	if($('.textmessagearea').val().length > 1){
		$('#charcountplural' + y).text('s');
	} else {
		$('#charcountplural' + y).text('');
	}
	
 $('#creditcount' + y).text(Math.ceil($('.textmessagearea' + y).val().length / 160))
	if(Math.ceil($('.textmessagearea' + y).val().length / 160) > 1){
		$('#creditcountplural' + y).text('s');} else {$('#creditcountplural' + y).text('');
	}


}



function ValidateMessage(){
	var msg = ''
	if($('#messagesend-content').val() == '' && $('#messagesend-type').val() == 'custom') {
		msg = msg +  '- Your custom message is blank.\n';
	}	
	if($('.recipientinput[name="recipient"]').val() == '0' || $('.recipientinput[name="recipient"]').val() == '')  {
		msg = msg + '- No group or contact selected to send the message to.\n' ;
	}
	if($('#messagesend-type').val() == '0')  {
		msg = msg + '- No message type was selected.\n' ;
	}
	if($('#messagesend-type').val() == 'M' && $('#manualnumber').val() == '')  {
		msg = msg + '- No target mobile number was provided.\n' ;
	}
	if(msg != ""){ 
		alert("Your message cannot be queued because: \n" + msg); 
		return false;
	} else {
		 return true;
	}
		
}


$( document ).ready(function() {

	
	$('body').on('click','#tab-button-group a',function(){
		$('.recipientinput').attr("name","")
		$('#recipientselectbox-group').attr("name","recipient")
	})
	
	$('body').on('click','#tab-button-contact a',function(){
		$('.recipientinput').attr("name","")
		$('#recipientselectbox-contact').attr("name","recipient")
	})
	
	
	$('body').on('click','#tab-button-manual a',function(){
		$('.recipientinput').attr("name","")
		$('#recipientselectbox-manual').attr("name","recipient")
	})
	
	
	$('body').on('click','#addoptout',function(){
		if($('.recipientinput[name="recipient"] option:selected').val().charAt(0) == "G"){
				$.post('/actions/message-opt-out-get.php', {id: $('#recipientselectbox-group option:selected').val()}, function(data){ 
				optmessage = data; 
				$('#messagesend-content').val($('#messagesend-content').val() + optmessage);
				 charcount();
			});	
		} else {
			alert('You can only add an opt-out message when sending to a group. Please select a group and click this button again');	
		}
	})
	
	
	$('body').on('click','#addnamemergecustom',function(){
					var cursorPos = $('#messagesend-content').prop('selectionStart');
					var v = $('#messagesend-content').val();
					var textBefore = v.substring(0,  cursorPos );
					var textAfter  = v.substring( cursorPos, v.length );
					$('#messagesend-content').val( textBefore+ '{{{CustomText}}}' +textAfter );
					charcount();
	});
				
	$('body').on('click','#addnamemergename',function(){
					var cursorPos = $('#messagesend-content').prop('selectionStart');
					var v = $('#messagesend-content').val();
					var textBefore = v.substring(0,  cursorPos );
					var textAfter  = v.substring( cursorPos, v.length );
					$('#messagesend-content').val( textBefore+ '{{{ContactName}}}' +textAfter );
					charcount();
	});
				
	$('body').on('click','#addnamemergemobile',function(){
					var cursorPos = $('#messagesend-content').prop('selectionStart');
					var v = $('#messagesend-content').val();
					var textBefore = v.substring(0,  cursorPos );
					var textAfter  = v.substring( cursorPos, v.length );
					$('#messagesend-content').val( textBefore+ '{{{Number}}}' +textAfter );
					charcount();
	});						
	
});




// remove content of modal when closed
/*
$('body').on('hidden.bs.modal', '.modal', function () {
	$(this).removeData('bs.modal');
});
*/


// ###################################################
// Event item expander code
// ###################################################

$( document ).ready(function() {
	$('body').on('change', '#btn-check-expand',function () {
		$('.eventbodypreview, .eventbodyfull').toggleClass('d-none');
		$('.event-button-expand, .event-button-compact').toggleClass('d-none');
		$(this).next().find('i').toggleClass('fa-down-left-and-up-right-to-center fa-up-right-and-down-left-from-center');
		$(this).next().find('span').text(function(i, text){
			return text === "Expand" ? "Reduce" : "Expand";
		})
	});



	$('body').on('click','.event-button-expand',function(){
		
		var event_id = $(this).data('event-id');

		$('#eventbodypreview' + event_id).addClass('d-none');
		$('#eventbodyfull' + event_id).removeClass('d-none'); 

		$(this).addClass('d-none');
		$(this).next('.event-button-compact').removeClass('d-none');
	


	});

	$('body').on('click','.event-button-compact',function(){
		
		var event_id = $(this).data('event-id');

		$('#eventbodypreview' + event_id).removeClass('d-none');
		$('#eventbodyfull' + event_id).addClass('d-none'); 

		$(this).addClass('d-none');
		$(this).prev('.event-button-expand').removeClass('d-none');
		


	});
});


// Call back button
$( document ).ready(function() {
	$('body').on('click','.event-button-callback',function(){

		var thisbutton = $(this);
		setTimeout(function(){
			thisbutton.html('Calling...')},10); 
		
			setTimeout(function(){
				thisbutton.html('Call Back')},6000);  

				$.get('actions/click2dial', {  customer_uid: thisbutton.data("customer-uid"),number: thisbutton.data("number")} );
	})

});

// Mark unread button
$( document ).ready(function() {
	$('body').on('click','.event-button-markunread',function(){

		var thisbutton = $(this);

	
		$.post('actions/phptasks', { task: 'emailnotseen', event_uid: thisbutton.data("event-uid") }, function(){
			if(location.pathname == "/feed"){
				accountlink = 1;
			} else {
				accountlink = 0;
			}

			$.get( "/includes/eventitem?event_uid=" + thisbutton.data("event-uid"), function( data ) {
				$('#event-item-' + thisbutton.data("event-uid")).replaceWith(data);

			})

	
		});



	});

});


// Flag / UnFlag button
$( document ).ready(function() {
	$('body').on('click','.event-button-flagunflag',function(){
		var thisbutton = $(this);

		$.post('actions/phptasks', { task: 'flagtoggle', event_uid: thisbutton.data("event-uid") }, function(){

			if(location.pathname == "/feed"){
				accountlink = 1;
			} else {
				accountlink = 0;
			}
			$.get( "/includes/eventitem?event_uid=" + thisbutton.data("event-uid"), function( data ) {
				$('#event-item-' + thisbutton.data("event-uid")).replaceWith(data);

			})

	
		});


	});

});

// Remove event button
$( document ).ready(function() {
	$('body').on('click','.event-button-delete',function(){
		var thisbutton = $(this);

		if(confirm('Are you sure you want to delete this?')){
			$.post('actions/phptasks.php' , {task : 'deleteemail' , event_uid: thisbutton.data("event-uid"), site_id : thisbutton.data("customer-id")},function(){
				$('#n' + thisbutton.data("event-id")).fadeOut('slow')})
		} else {
			return false;
		}

	});

});

// Remove event button
$( document ).ready(function() {
	$('body').on('click','.event-button-restore',function(){
		var thisbutton = $(this);

		$('#restore-' + thisbutton.data("event-uid")).text('Restoring...'); 
		$.post('actions/event-restore', { event_uid: thisbutton.data("event-uid") }, function(){
			$('#restore-' + thisbutton.data("event-uid")).text('Restored!'); }); 
	});

});

// call event button
$( document ).ready(function() {
	$('body').on('click','.event-button-call',function(){
		var thisbutton = $(this);

		setTimeout(function(){
			thisbutton.html('Calling...')},10); 
			setTimeout(function(){
				thisbutton.html('Call')},6000);  
			$.post('actions/click2dial', { customer_uid: thisbutton.data("customer-uid"), number: thisbutton.data("number")});

	});

});


//  event mark seen button
$( document ).ready(function() {
	$('body').on('click','.event-button-markseen',function(){
		var thisbutton = $(this);

		$.post('actions/phptasks', { task: 'emailseen', event_uid: thisbutton.data("event-uid") }, function(){
			if(location.pathname == "/feed"){
				accountlink = 1;
			} else {
				accountlink = 0;
			}

			$.get( "includes/eventitem?accountlink=" + accountlink + "&event_uid=" + thisbutton.data("event-uid"), function( data ) {
				$('#event-item-' + thisbutton.data("event-uid")).replaceWith(data);

			})

	
		});
	


	})

});


//  event mark seen button
$( document ).ready(function() {
	$('body').on('click','.event-button-markseenall',function(){
		var thisbutton = $(this);

		$.post('actions/phptasks', { task: 'emailseenall', event_uid: thisbutton.data("event-uid") }, function(){
			if(location.pathname == "/feed"){
				accountlink = 1;
			} else {
				accountlink = 0;
			}

			$.get( "/includes/eventitem?accountlink=" + accountlink + "&event_uid=" + thisbutton.data("event-uid"), function( data ) {
				$('#event-item-' + thisbutton.data("event-uid")).replaceWith(data);

			})

	
		});
	


	})

});


// poke event button
$( document ).ready(function() {
	$('body').on('click','.event-button-poke',function(){
		var thisbutton = $(this);

		$.get( 'actions/event-poke', { event_uid: thisbutton.data("event-uid") } );

	})

});

// show raw content event button
$( document ).ready(function() {
	$('body').on('click','.event-button-showrawcontent',function(){
		var thisbutton = $(this);

		$('#eventrawcontent' + thisbutton.data("event-uid")).fadeToggle('slow');

	})

});

// AJAX Clocking in and out 
$( document ).ready(function() {
	$('body').on("click", '.clock-button', function(){
		$(".clock-button").attr("disabled","disabled");
		$(this).html("<i class=\"fa-solid fa-circle-notch fa-spin\"></i>");
		$.get('actions/clock?task=' + $(this).data("clock-action"));
	})
});


// removes examples from welcome pack
$( document ).ready(function() {

	$('body').on('click', '.remove-example-button',function(){

		var example_id = $(this).data("example-id");
		if(confirm("Are you sure you want to do this?")){
			if($(this).data("example-type") == "logo"){
				$.get( "actions/welcomepack-logo-design-example-remove", { id: example_id  } )
				.done(function( data ) {
					$("#example-" + example_id ).fadeOut('slow');
				});
			}

			if($(this).data("example-type") == "website"){
				$.get( "actions/welcomepack-design-example-remove", { id: example_id  } )
					.done(function( data ) {
					$("#example-" + example_id ).fadeOut('slow');
				});
			}


		} else {
			return false;
		}
	})

})


// Gallery image rotate
$( document ).ready(function() {

	$('body').on('click', '.gallery-rotatebutton',function(){

		var gallery_image_id = $(this).data('gallery-image-id');
		var image_id = $(this).data('image-id');
        var image_uid = $(this).data('image-uid');
		var page_id = $(this).data('page-id');
		var extension = $(this).data('extension');

		$('#image_' + gallery_image_id).addClass('updating');
		$.post('actions/lister-image-rotate?type=gallery&croptype=gallery&page_id=' + page_id + '&imageid=' + image_id,function(){
			$('#img' + gallery_image_id).attr('src', 'https://s3.eu-west-1.amazonaws.com/cdn.webfactore.co.uk/sr_' + image_uid + '_largeish.' + extension + '?timestamp=' + new Date().getTime());

			$('#image_' + gallery_image_id).removeClass('updating');
		});

	})
});

// disable links when they may take a little longer to process
$( document ).ready(function() {
	$('body').on("click",'.disableonclick',function(){

		$(this).attr("disabled", "disabled");
		$(this).html("<i class=\"fa-solid fa-circle-notch fa-spin\"></i> Processing...")
	})
});


$(document).ready(function() {
	$('#openlivechat').on("click", function() {

		$('#amazon-connect-chat-widget button').click();
		
	});
});




$( document ).ready(function() {
	$('.time-since').each(function(){	
		if(!$(this).data("datetime-from") || $(this).data("datetime-from") && $(this).data("datetime-from") == ""){
			$(this).text(moment($(this).data("datetime")).fromNow($(this).data("hide-suffix")));
		} else {
			
			$(this).text(moment($(this).data("datetime")).from($(this).data("datetime-from"), $(this).data("hide-suffix")));
		}
	})
});



// updates URLs with querystring parameters without reloading page
function urlUpdate(querystring_name,querystring_value){
	// Get the current URL and querystring parameters
	var currentUrl = window.location.href;
	var searchParams = new URLSearchParams(window.location.search);

	// Check if the 'searchterm' parameter exists
	if (searchParams.has(querystring_name)) {
		// If the 'searchterm' parameter exists, remove it
		searchParams.delete(querystring_name);
	}

	// Add the 'searchterm' parameter with the value 'searchterm'
	searchParams.append(querystring_name, querystring_value);

	// Update the URL with the new querystring parameters
	var newUrl = currentUrl.split('?')[0] + '?' + searchParams.toString();
	history.pushState(null, null, newUrl);


}


// update url if tab is changed
$( document ).ready(function() {

    $('.url-tab-update').on('click',function(){ 
        urlUpdate("tab",$(this).data("tab"));
    })

})

$( document ).ready(function() {
	$('.selectpicker').selectpicker({
		width: 'auto'
	});
});

// adds loading functionality to links
$( document ).ready(function() {
    $('body').on('click', '.loadinglink', function(event){
        $(this).addClass("disabled");
        if($(this).attr("data-loading-text") == ""){
            $(this).attr("data-loading-text", "Please wait...");
        }
        $(this).html($(this).attr("data-loading-text"));
    })
});



// makes elements live filterable 

$(document).ready(function(){
	$('#filterinput').focus();
	$('body').on('keyup','#filterinput',function(){
		var searchterm = $(this).val().toLowerCase();
		$('.filterable').each(function(){

			text = $(this).text();
			
			//check if this .filter-name is present
			if($('.filter-name',this).length > 0){
				text = $('.filter-name',this).text();
			}


			

			if(text.toLowerCase().indexOf(searchterm) >= 0){
				$(this).show();
				$(this).addClass('filterable-visible');
				$(this).removeClass('filterable-invisible');
			} else{
				$(this).hide();
				$(this).addClass('filterable-invisible');
				$(this).removeClass('filterable-visible');
			}

			

		});


		$('.filterable-group').each(function(){
				var visible;
				$('.filterable',this).each(function(){
					if($(this).hasClass('filterable-visible')){
						visible = true;
					} 

				})

				if(visible){
					$(this).show();
				} else {
					$(this).hide();
				}

			

			})

		
		// if has data masonry attribute, then reinit masonry
		if($("#filterinput").data('masonrylist') == true){

			$('.masonry').masonry('layout');
		}



	})


});




function timeSinceAutoUpdate(){

	$(".time-since-exact").each(function(){

		if(!$(this).data("datetime-from") || $(this).data("datetime-from") && $(this).data("datetime-from") == ""){
			var start_time =  moment.tz($(this).data("datetime-from"), "Europe/London");
		}else{
			var start_time = moment.tz("Europe/London");
		}
		
		var end_time = moment.tz($(this).data("datetime"), "Europe/London");
		var diff = moment.duration(start_time.diff(end_time));
		if(diff.asHours() > 1){
			var formatted_diff = moment.utc(diff.asMilliseconds()).format("HH:mm:ss");
		} else {
			var formatted_diff = moment.utc(diff.asMilliseconds()).format("mm:ss");
		}

		$(this).text(formatted_diff);
	
	});
  
  }
  
setInterval(timeSinceAutoUpdate, 1000);

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

//saves forms with shortcurts
$(document).ready(function(){
	document.addEventListener("keydown", function (event) {
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
			event.preventDefault(); // Prevent the default browser save action
	
			const form = document.querySelector(".saveshortcut");
			if (form) {
				const submitButton = form.querySelector("[type='submit']");
				if (submitButton) {
					submitButton.click();
				}
			}
		}
	});

})

