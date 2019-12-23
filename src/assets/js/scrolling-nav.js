
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

})(jQuery); // End of use strict

$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            navbar = target;
        $target = $(target);
        $('html, body').stop().animate({
            //'scrollTop': $target.offset().top+2 /*(change on 24-11-2017)*/
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#mainMenu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#mainMenu ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}






//******Form Validation*********

(function($,W,D)
{
    var JQUERY4U = {};
    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {
            //form validation rules
      //Name validation
      $.validator.addMethod("nameRegex", function(value, element) {
              return this.optional(element) || /^[a-zA-Z\' ']+$/i.test(value);
      }, "Only letters, or spaces allowed");
	  
      //Mobile validation	  
	  $.validator.addMethod("telRegex", function(value, element) {
              return this.optional(element) || /^[0-9]{10,10}$/i.test(value);
      }, "Only Numbers are allowed");
	  
      //Email validation
	  $.validator.addMethod("emailRegex", function(value, element) {
              return this.optional(element) || /^^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/i.test(value);
      }, "Enter valid email address");
      $("#contact-form").validate({
         rules: {
            txt_name: {
            required: true,
            nameRegex: true           
          },
          txt_city: {
            required: true,
            nameRegex: true
          },
          txt_email: {
            required: true,
            emailRegex: true
          },		  
          txt_tel: {
            required: true,
			minlength: 10,
			maxlength: 10,
			telRegex: true
          },
          txt_comm: {
            required: true,
            //nameRegex: true         
          },          
       },
       submitHandler: function(form) {
          //return false;
          $('#btn_cont').attr("disabled", false); 
         // $('input:submit').attr("disabled", true); 
                   // form.submit();
           submit_post();
		   document.getElementById("contact-form").reset();
          }
      });
    }
  }//when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });
})(jQuery, window, document);
function submit_post(){ 
//alert('Hello');
var dataString = $("#contact-form").serialize();
      $.ajax({
      type: "POST",
      url:  "contact-ajax.php",
      data: dataString,
      cache: false,    

      beforeSend: function()
      {
      },      
      success: function(msg){   
          //var obj = $.parseJSON(msg);     
          
          //alert(obj[0]);
          //msg_span
         //alert('Hello');
        //$.('#msg_span').html(obj[0]);
         $("#msg_span").html(msg);
      },
	  
      error: function(){
      alert("failure");
      }
	  
      });
}
(function($,W,D)
{
    var JQUERY4U = {};
    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {       
        $("#app-form1").validate({
         rules: {
            mobile: {
            required: true,
            minlength: 10,
            maxlength: 10,
			telRegex:true
          },               
       },     
       submitHandler: function(form) {
          //return false;
          //$('input:submit').attr("disabled", true); 
          $('#get_app1').attr("disabled", false); 
                   // form.submit();get_app1
           submit_app();
	       document.getElementById("app-form1").reset();
          }
      });
    }
  }//when the dom has loaded setup form validation rules

    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });
})(jQuery, window, document);
function submit_app(){ 
var dataString = $("#app-form1").serialize();
      $.ajax({
      type: "POST",
      url:  "app-ajax.php",
      data: dataString,
      cache: false,    
      beforeSend: function()
      {          
      },   
      success: function(msg){         
         $("#msg_app1").html(msg);
      },
      error: function(){
      alert("failure");
      }
      });
}
function remove_msg_app1() {
	$("#msg_app1").html('');
}
function remove_msg_app2() {
	$("#msg_app2").html('');
}
function remove_contact_msg() {
	$("#msg_span").html('');
}

(function($,W,D)
{
    var JQUERY4U = {};
    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {
        $("#app-form2").validate({
         rules: {
            mobile: {
            required: true,
            minlength: 10,
            maxlength: 10,
			telRegex:true
          },               
       },   
       submitHandler: function(form) {
          //return false;
          //$('input:submit').attr("disabled", true); 
          $('#get_app2').attr("disabled", false); 
                   // form.submit();get_app1
           submit_app2();
		   document.getElementById("app-form2").reset();
          }
      });
    }
  }//when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });
})(jQuery, window, document);
function submit_app2(){ 
//alert('Hello');
var dataString = $("#app-form2").serialize();
      $.ajax({
      type: "POST",
      url:  "app-ajax.php",
      data: dataString,
      cache: false,    
      beforeSend: function()
      {          
      },   
      success: function(msg){   
         $("#msg_app2").html(msg);
      },
      error: function(){
      alert("failure");
      }
      });
}
