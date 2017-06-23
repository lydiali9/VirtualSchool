$(document).foundation();

$('document').ready(function(){
    if ($('.carousel').length > 0) {
      if ($('html').attr('dir') == "rtl") {
          var scrollDir = -1;
          var rtlBool = true;
      }
      else {
          var scrollDir = 1;
          var rtlBool = false;
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
        rtl: rtlBool,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next')
      })
  }
});
