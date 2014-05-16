/* Sites-Stroy.ru by iProger */
$(function(){
	
	var note = $('#note'),
		ts = new Date(2014, 0, 1),
		newYear = true;
	
	if((new Date()) > ts){
		var dbt=new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000));
		var finisDate = new Date((dbt.getMonth()+1)+"/"+dbt.getDate()+"/"+dbt.getFullYear()+" 5:00 AM");
		ts = finisDate;
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts
	});
	
	var $gallery=$('.gallery');
						
	$.each($gallery, function( no_, gallery_ ) {
		var $gallery_container=$('.gallery_container',gallery_);
		var $gallery_thumbnail=$('.gallery_thumbnail',gallery_);
		$.each($gallery_thumbnail, function( no2_, gallery_thumbnail ) {
			$gallery_img=$('img',gallery_thumbnail);
			$(gallery_thumbnail).mouseover(function() {
				$('img',$gallery_container).addClass('out');
				$('.gallery_thumbnail',$(this).parent()).removeClass('active');
				$(this).addClass('active');
				$newimg=$("<img src="+$('img',this).attr('src')+" class='gallery_main animation'>");
									
				$gallery_container.append($newimg);
				var wait = window.setTimeout( function(){
					$newimg.addClass('in');
					},300);
			});									  		
		});
	});
	
	$('a[href*=#]').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
	  return false;
	});
	
	$(window).scroll(function () {if ($(this).scrollTop() > 0) {$('#scroller').fadeIn();} else {$('#scroller').fadeOut();}});
	$('#scroller').click(function () {$('body,html').animate({scrollTop: 0}, 400); return false;});
	
	$(".sval-form > input").bind("focus", function(e){
		var sval = $(this).attr("sval");
		var val = $(this).val();
			
		if($(this).attr('name')=='kolvo' && val==sval)
			$(this).val('1');
		else if(val==sval)
			$(this).val('');
	});
	
	$(".sval-form > input").bind("blur", function(e){
		var sval = $(this).attr("sval");
		var val = $(this).val().trim();

		if(val=='')
			$(this).val(sval);
	});
	
	$(".buy").bind("click", function(e){
	    var form = $(this).parent();
		var err = false;
		form.find('input').each(function(){
			if($(this).attr('name')!="kolvo" && ($(this).val()=="" || $(this).val()==$(this).attr('sval')))
			{
				alert("Заполните все поля!");
				err = true;
				return false;
			}
		});
		if(err)
			return false;
        console.log(yaCounter24959906.reachGoal('xzyloBuy'));
		var fio = form.find('input[name="fio"]').val();
		var email = form.find('input[name="email"]').val();
		var tel = form.find('input[name="tel"]').val();
		var adress = form.find('input[name="adress"]').val();
		var kolvo = form.find('input[name="kolvo"]').val();
		if(kolvo=="Количество")
			kolvo = 1;
		$.ajax({
			type: "POST",
			url: "ajax/order.php",
			data: "fio="+fio+"&email="+email+"&tel="+tel+"&adress="+adress+"&kolvo="+kolvo,
			success: function(response){
				openModal('suc_order');
				$('#scroller').click();
			}
		});
		return false;
	});
	
});

function showRev(obj){
$('#hide-rev').fadeIn();
$(obj).css('display', 'none');
}


function openModal(id)
{
	var mask = $('<div id="mask"></div>');
	$(document.body).append(mask);
	
	mask.click(function(){
		closeModal(id);
	});
	
	$('#'+id+" .close").click(function(){
		closeModal(id);
	});
	
	var maskHeight = $(document).height();
    var maskWidth = $(window).width();
  
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    $('#mask').fadeTo("slow",0.68).fadeIn(1000); 
	
	var winH = $(window).height();
    var winW = maskWidth;
	
	$('#'+id).css('top',  winH/2-$('#'+id).height()/2);
    $('#'+id).css('left', winW/2-$('#'+id).width()/2);
    $('#'+id).fadeIn(500);
}

function closeModal(id)
{
	$('#mask').remove();
	$('#'+id).fadeOut(300);
}
