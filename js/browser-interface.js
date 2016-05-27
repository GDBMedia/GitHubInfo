var getRepos = require('./../js/git.js').getRepos;
var dateFormat = require('dateformat');

$(document).ready(function(){
  $('.datetimepicker1').datetimepicker({
    format: 'ddd, DD MMM YYYY HH:mm:ss'
  });

  $("#user").submit(function(e){
    e.preventDefault();
    var user = $("#username").val();
    getRepos(user);
  });

});
