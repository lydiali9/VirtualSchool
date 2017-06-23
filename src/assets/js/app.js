$(document).foundation();

$('document').ready(function(){
    if ($('.carousel').length > 0) {
      if ($('html').attr('dir') == "rtl") {
          var scrollDir = -1;
          var rtlBool = true;
      }
      else {
          // scrollDir = 1;
          // rtlBool = false;
      }

      $('.carousel').on('init', function (event, slick) {
      });

      $('.carousel').slick({
        dots: true,
        fade: true,
        infinite: true,
        lazyLoad: 'ondemand',
        lazyLoadBuffer: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToMove: 1,
        //rtl: rtlBool,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next')
      });
  }
});

$('document').ready(function(){
    if (Cookies.get('loggedin') === "true") {
        $('.user-menu.loggedOut').addClass('hide');
        $('.user-menu.loggedIn').removeClass('hide');
    } else {
    }
});

$('document').ready(function(){
    if ($('textarea').length > 0) {
      for (var i = 0; i < $('textarea').length; i++) {
        if ($($('textarea')[i]).attr('value') !== undefined) {
          $('textarea')[i].value = $($('textarea')[i]).attr('value');
        }
      }
    }
});

$('document').ready(function(){
  $("[data-accordion-group] .accordion-title").click(function(){
    console.log(this);
    var cid = this.id;
    $(".accordion").each(function(){
      if($(this).find(".accordion-title").attr("id") != cid){
        $(this).foundation('up', $(this).find(".accordion-content"));
      }
    });
  });
});