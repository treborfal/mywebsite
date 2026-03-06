$(function () {
	 $("#page > .block").hover(
	 function () {
         $("#page > .block").stop().animate({
             width: "51%"
         }, 500);
         $(this).stop().animate({
             width: '49%'
         }, 500);
     }).mouseout(function(){
         $("#page > .block").stop().animate({
             width: "50%"
         }, 500);
     });
});