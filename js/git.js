var apiKey = require("./../.env").ApiKey;
var parse = require('parse-link-header');

RepoInfo = function(response, xhr) {
  this.user = response[0].owner.login;
  this.repos = response;
  this.pages = parse(xhr.getResponseHeader('link'));
};

exports.getRepos = function(user, displayRepos, page, num){
  $.get('https://api.github.com/users/' + user + '/repos?sort=updated&per_page=' + num + '&access_token=' + apiKey + "&page=" + page).then(function(response, success, xhr){
    var repoInfo = new RepoInfo(response, xhr);
    displayRepos(repoInfo);
  }).fail(function(error){
    $("#repolist").text("Unable to Find User");
  });
};

exports.getUser = function(user, displayUser){
  $.get('https://api.github.com/users/' + user + '?access_token=' + apiKey).then(function(response){
    displayUser(response);
  }).fail(function(error){

  });
};
