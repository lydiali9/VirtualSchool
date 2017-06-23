var Modules = {};

Module = function(element, data) {
  /* If not instantiated with new, do it right */
  if (this.constructor !== Module) {
    return new Module();
  }
  this.el = element;
  this.items = this.el.find("[data-accordion-item]");
  this.init();
};

Module.prototype.init = function () {
    var self = this;

    //this.bind();
};

/**
  * Bind Event Listeners
**/
Module.prototype.bind = function() {
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


(function (UNWomen, $) {
    UNWomen.VS = UNWomen.VS || {};

    UNWomen.VS.modules = {
        init: function () {

            if ($('[data-module-container]').length > 0) {
              var moduleTitle = $('[data-module-container]').data('module-container');
              var moduleStatus = Cookies.get("Module." + moduleTitle);

              if (moduleStatus != "true") {
                $('.module-completion-container .button').css('display', 'inline-block');
                $('.module-completion-container').fadeIn();
              }
              else {
                $('.module-completion-container .switch').addClass('active');
                $('.module-completion-container .switch input').attr('checked', true);
                $('.module-completion-container').fadeIn();
              }
            }

            if ($('[data-module-activate]').length > 0) {
              $('[data-module-activate]').bind("click", function(){
                if ($('[data-module-activate]').data('module-activate') !== "") {
                  UNWomen.VS.modules.activation($('[data-module-activate]').data('module-activate'));
                }
                else {
                  console.log('Unable to mark module completed in Cookies. Data "path" in SampleCourseModules.yml not set.');
                }
              });
            }

            if ($('[data-module-toggle]').length > 0) {
              $('[data-module-toggle]').bind("click", function(){
                setTimeout(function(){
                  UNWomen.VS.modules.toggle($('[data-module-toggle]').data('module-toggle'));
                }, 200);
              });
            }

            if ($('[data-module-list]').length > 0) {
              var ModuleList = $('[data-module-check]');
              for (var i = 0; i < ModuleList.length; i++) {
                if (Cookies.get("Module." + ($(ModuleList[i]).data('module-check'))) == "true") {
                  $($(ModuleList)[i]).parents(".sub-feed").addClass('completed');
                }
                else {

                }
              }
            }

            if ($('[data-course-container]').length > 0) {
              var CourseList = $('[data-course-container]');
              for (var n = 0; n < CourseList.length; n++) {
                if ($(CourseList[n]).find('.sub-feed').length === $(CourseList[n]).find('.sub-feed.completed').length) {
                  $(CourseList[n]).parents('.feed-column').addClass('completed');
                }
              }
            }
        },

        activation: function (module) {
          Cookies.set("Module." + module, "true");

          $('.module-completion-container .button').removeAttr('style');
          $('.module-completion-container .switch').addClass('active');
          $('.module-completion-container .switch input').attr('checked', true);
        },

        toggle: function (module) {
          if ($('[data-module-toggle]').siblings('input:checked').length > 0) {
            Cookies.set("Module." + module, "true");
          }
          else {
            Cookies.remove("Module." + module);
          }
        },

        deleteAllCookies: function() {
          var cookies = document.cookie.split(";");

          for (var i = 0; i <= cookies.length; i++) {
            if (i == cookies.length) {
              window.location = "/";
            }
            else {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              Cookies.remove(name.trim());
            }
          }

        }
    };

    $(function () {
        UNWomen.VS.modules.init();
    });
})(window.UNWomen = window.UNWomen || {}, jQuery);
