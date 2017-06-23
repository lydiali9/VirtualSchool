module.exports = function(value, options)
{
    return parseInt(value) + 1;
};

module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper('inc', function (str)  {
    return parseInt(value) + 1;
  });
};
