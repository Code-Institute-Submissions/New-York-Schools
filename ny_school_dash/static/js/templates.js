$(document).ready(function(){
  if(window.location.pathname.match(/\/dashboard/))
  {
    $("#tour-button").show();
  }
  else
  {
    $("#tour-button").hide();
   }
});
