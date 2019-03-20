// Page Scroll Feature

// Select all links with hashes
    $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


// Contact Form

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input2').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })



    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input2').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);


// Clock feature

var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Clock = function () {
  function Clock(id) {_classCallCheck(this, Clock);
    this.timezone = parseInt(document.getElementById(id).dataset.timezone);

    if (this.isDST(new Date())) {
      this.timezone += 1;
    }

    this.handSeconds = document.querySelector("#" + id + " .hand.seconds");
    this.handMinutes = document.querySelector("#" + id + " .hand.minutes");
    this.handHours = document.querySelector("#" + id + " .hand.hours");

    this.getTime();
    this.cycle();
  }_createClass(Clock, [{ key: "isDST", value: function isDST(

    now) {
      var jan = new Date(now.getFullYear(), 0, 1);
      var jul = new Date(now.getFullYear(), 6, 1);
      var dst = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

      return now.getTimezoneOffset() < dst;
    } }, { key: "draw", value: function draw(

    hours, minutes, seconds) {
      var drawSeconds = seconds / 60 * 360 + 90;
      var drawMinutes = minutes / 60 * 360 + 90;

      if (hours >= 12) {
        drawHours = hours - 12;
      }

      var drawHours = hours / 12 * 360 + 90;

      this.handSeconds.style.transform = "rotate(" + drawSeconds + "deg)";
      this.handMinutes.style.transform = "rotate(" + drawMinutes + "deg)";
      this.handHours.style.transform = "rotate(" + drawHours + "deg)";

      // fix for animation bump on when clock hands hit zero
      if (drawSeconds === 444 || drawSeconds === 90) {
        this.handSeconds.style.transition = "all 0s ease 0s";
      } else {
        this.handSeconds.style.transition = "all 0.05s cubic-bezier(0, 0, 0.52, 2.51) 0s";
      }
    } }, { key: "getTime", value: function getTime()

    {
      var now = new Date();

      var hours = now.getUTCHours() + this.timezone;
      var minutes = now.getUTCMinutes();
      var seconds = now.getUTCSeconds();

      this.draw(hours, minutes, seconds);
    } }, { key: "cycle", value: function cycle()

    {
      setInterval(this.getTime.bind(this), 1000);
    } }]);return Clock;}();


new Clock('hongkong');

