$(document).ready(function(e) {
    function s() {
        e(".cd-nav-trigger").removeClass("nav-is-visible"), e(".cd-main-header").removeClass("nav-is-visible"), e(".cd-primary-nav").removeClass("nav-is-visible"), e(".has-children ul").addClass("is-hidden"), e(".has-children a").removeClass("selected"), e(".moves-out").removeClass("moves-out"), e(".cd-main-content").removeClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
            e("body").removeClass("overflow-hidden")
        })
    }

    function i(s) {
        "close" == s ? (e(".cd-search").removeClass("is-visible"), e(".cd-search-trigger").removeClass("search-is-visible"), e(".cd-overlay").removeClass("search-is-visible")) : (e(".cd-search").toggleClass("is-visible"), e(".cd-search-trigger").toggleClass("search-is-visible"), e(".cd-overlay").toggleClass("search-is-visible"), e(window).width() > l && e(".cd-search").hasClass("is-visible") && e(".cd-search").find('input[type="search"]').focus(), e(".cd-search").hasClass("is-visible") ? e(".cd-overlay").addClass("is-visible") : e(".cd-overlay").removeClass("is-visible"))
    }

    function n() {
        var e = window,
            s = "inner";
        return "innerWidth" in window || (s = "client", e = document.documentElement || document.body), e[s + "Width"] >= l
    }

    function a() {
        var s = e(".cd-nav");
        n() ? (s.detach(), s.insertBefore(".cd-header-buttons")) : (s.detach(), s.insertAfter(".cd-main-content"))
    }
    var l = 1170;
    a(), e(window).on("resize", function() {
        window.requestAnimationFrame ? window.requestAnimationFrame(a) : setTimeout(a, 300)
    }), e(".cd-nav-trigger").on("click", function(n) {
        n.preventDefault(), e(".cd-main-content").hasClass("nav-is-visible") ? (s(), e(".cd-overlay").removeClass("is-visible")) : (e(this).addClass("nav-is-visible"), e(".cd-primary-nav").addClass("nav-is-visible"), e(".cd-main-header").addClass("nav-is-visible"), e(".cd-main-content").addClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
            e("body").addClass("overflow-hidden")
        }), i("close"), e(".cd-overlay").addClass("is-visible"))
    }), e(".cd-search-trigger").on("click", function(e) {
        e.preventDefault(), i(), s()
    }), e(".cd-overlay").on("swiperight", function() {
        e(".cd-primary-nav").hasClass("nav-is-visible") && (s(), e(".cd-overlay").removeClass("is-visible"))
    }), e(".nav-on-left .cd-overlay").on("swipeleft", function() {
        e(".cd-primary-nav").hasClass("nav-is-visible") && (s(), e(".cd-overlay").removeClass("is-visible"))
    }), e(".cd-overlay").on("click", function() {
        s(), i("close"), e(".cd-overlay").removeClass("is-visible")
    }), e(".cd-primary-nav").children(".has-children").children("a").on("click", function(e) {
        e.preventDefault()
    }), e(".has-children").children("a").on("click", function(s) {
        n() || s.preventDefault();
        var a = e(this);
        a.next("ul").hasClass("is-hidden") ? (a.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".has-children").parent("ul").addClass("moves-out"), a.parent(".has-children").siblings(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"), e(".cd-overlay").addClass("is-visible")) : (a.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".has-children").parent("ul").removeClass("moves-out"), e(".cd-overlay").removeClass("is-visible")), i("close")
    }), e(".go-back").on("click", function() {
        e(this).parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass("moves-out")
    })



    $('body').on('click', '.modal-link', function(event){
		event.preventDefault();

		$('#modal-holder').load($(this).attr('href'),function(){
			var myModal = new bootstrap.Modal(document.getElementById('modal'), {
			keyboard: false,
			focus: false,
			backdrop: 'static'
		});


	

		myModal.show();
	});

	

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


$(document).ready(function() {
	$('#openlivechat').on("click", function() {

		$('#amazon-connect-chat-widget button').click();
		
	});
});


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}