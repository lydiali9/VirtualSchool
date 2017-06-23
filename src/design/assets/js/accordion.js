var Accordion = {};

Accordion = function(element, data) {
  /* If not instantiated with new, do it right */
  if (this.constructor !== Accordion) {
    return new Accordion();
  }
  this.el = element;
  this.items = this.el.find("[data-accordion-item]");
  this.init();
};

Accordion.prototype.init = function () {
    var self = this;

    this.bind();
};

/**
  * Bind Event Listeners
**/
Accordion.prototype.bind = function() {
  var self = this;

  self.items.each(function(){
    var item = this;

    item.accordion_title = $(this).find("[data-accordion-title]")
      //.on('mouseover', "")
      //.on('mouseout', "")
      .on('click', function() {
        //self.accordionClick(this);
        self.AccordionClick(item);
      });
    item.accordion_content = $(this).find("[data-accordion-content]");
  });
  //$(window).on('changed.zf.mediaquery', self.updateMap.bind(self));
};

Accordion.prototype.AccordionClick = function(e) {
  var topPadding = $(e).css('padding-top');
  var height = e.accordion_content.height();

  if ($(e).hasClass('is-active')) {

  }
  else {
    this.items.each(function(){
      $(this).removeClass('is-active');
    });
    $(e).addClass('is-active');

    this.AccordionActivate();
  }
};

Accordion.prototype.AccordionActivate = function() {
  this.items.each(function(){
    var item = this;

    if (item.accordion_content.height() > 0 && !$(item).hasClass('is-active')) {
      $(item.accordion_content).css('height', 0);
    }
    else if ($(item).hasClass('is-active')) {
      console.log(item.accordion_content.height());
    }
  });
};


(function (UNWomen, $) {
    UNWomen.VS = UNWomen.VS || {};

    UNWomen.VS.accordion = {
        init: function () {
            // var accordions = $('[data-accordion-group]');
            // if (!accordions.length) {
            //     return;
            // }
            // for (var i = 0, il = accordions.length; i < il; ++i)
            // {
            //     new Accordion($(accordions[i]));
            // }

            $(window).on('down.zf.accordion', function(){
              $('[data-accordion-item]').parent().siblings('.feed-status').toggleClass('top-aligned');
              $('[data-accordion-item]').parents('.feed-columm').toggleClass('is-active');
            });
            $(window).on('up.zf.accordion', function(){
              $('[data-accordion-item]').parent().siblings('.feed-status').toggleClass('top-aligned');
              $('[data-accordion-item]').parents('.feed-columm').toggleClass('is-active');
            });

            $('.avatar').bind("click", function(){
              if ($(this).parents('.sub-feed').length > 0) {
                $(this).parents('.sub-feed').toggleClass('completed');

                if (
                  $(this).parents('.sub-feed').siblings('.sub-feed.completed').length
                  ===
                  $(this).parents('.sub-feed').siblings('.sub-feed').length
                ) {
                  $(this).parents('.feed-column').addClass('completed');
                }

                else {
                  $(this).parents('.feed-column').removeClass('completed');
                }
              }
              else {
                $(this).parents('.feed-column').toggleClass('completed');
                if ($(this).parents('.feed-column').hasClass('completed')) {
                  $(this).parents('.feed-column').find('.sub-feed').addClass('completed');
                }
                else {
                  $(this).parents('.feed-column').find('.sub-feed').removeClass('completed');
                }
              }
            });


        }
    };

    $(function () {
        UNWomen.VS.accordion.init();
    });
})(window.UNWomen = window.UNWomen || {}, jQuery);
