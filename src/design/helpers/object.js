module.exports = function(obj, fn)
{
  var buffer = "",
          key;

      for (key in obj) {
          if (obj.hasOwnProperty(key)) {
              buffer += fn({key: key, value: obj[key]});
          }
      }

      return buffer;
};

module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper('object', function (obj, fn)  {
    var buffer = "",
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                buffer += fn({key: key, value: obj[key]});
            }
        }

        return buffer;
  });
};
