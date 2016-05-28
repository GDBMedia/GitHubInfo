var getRepos = require('./../js/git.js').getRepos;
var getUser = require('./../js/git.js').getUser;
var dateFormat = require('dateformat');

var displayRepos = function(repoInfo){
  $(".pagination").text("");
    displayRepos2(repoInfo);
    for (i=1; i < (parseInt(repoInfo.pages.last.page) + 1); i++) {
        $(".pagination").append("<li><a class='page'>" + i + "</a></li>");
      }
  $(".page").click(function(e){
      e.preventDefault();
      getRepos(repoInfo.user, displayRepos2, this.innerHTML);
    });
};

var displayRepos2 = function(repoInfo){
  $("#repolist").text("");
  repoInfo.repos.forEach(function(repo){
    var date = dateFormat(repo.created_at, "mmmm dS, yyyy");
    if(repo.description){
      $("#repolist").append("<li><a href='" + repo.html_url + "' target='_blank'>" + repo.name + "</a><ul><li class='innertext'>Description: " + repo.description + "</li><li class='innertext'>Date Created: " + date + "</li><li class='innertext'>Main Language: " + repo.language + "</li></ul></li><hr>");
    }else{
      $("#repolist").append("<li><a href='" + repo.html_url + "' target='_blank'>" + repo.name + "</a><ul><li class='innertext'>Date Created: " + date + "</li><li class='innertext'>Main Language: " + repo.language + "</li></ul></li><hr>");
    }
  });
};

var displayUser = function(response){
  $("#follower").text("");
  if(response.name){
    $("#header").html("<a href='" + response.html_url + "' target='_blank'>" + response.name + "</a>");
  }else{
    $("#header").html("<a href='" + response.html_url + "' target='_blank'>" + response.login + "</a>");
  }
  $("#follower").append("<li class='nobullet'>Followers: " + response.followers);
  $("#follower").append("<li class='nobullet'>Following: " + response.following);
  $("#pic").html("<img src='" + response.avatar_url +"' class='img-responsive pull-left' id='profilepic'>");
};

$(document).ready(function(){
  $('.datetimepicker1').datetimepicker({
    format: 'ddd, DD MMM YYYY HH:mm:ss'
  });

  $("#user").submit(function(e){
    e.preventDefault();
    var user = $("#username").val();
    var num = $("#results").val();
    getRepos(user, displayRepos, 1, num);
    getUser(user, displayUser);
  });

});
