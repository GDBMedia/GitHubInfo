var apiKey = require("./../.env").ApiKey;

exports.getRepos = function(user){
  $.get('https://api.github.com/users/' + user + '/repos?sort=updated?access_token=' + apiKey).then(function(response){
    var arrayOfRepos = response;
    displayRepos(arrayOfRepos);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

var displayRepos = function(arrayOfRepos){
  var x = 0;
  var rowcount = 1;
  arrayOfRepos.forEach(function(value, index){
    if(x === 4){
      rowcount++;
      x = 0;
      $("#rowcontainer").append("<div class='row' id='row" + rowcount + "'></div>");
    }
    $("#row"+rowcount).append("<a href='" + value.html_url + "' target='_blank'><div class='col-md-3'>" + value.name + "</div></a>")
    x++;
  });
}
