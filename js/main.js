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

	setMask('tel','+7(999) 999-99-99');
	setMask('tel2','+7(999) 999-99-99');
	$("input[name='fio']").keyup(function(){
		$(this).val($(this).val().replace(/[-0-9)(_!'&\$@%\*\.]/,''));

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


function setMask(I,M){
	function R(s){return new RegExp('('+s.replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/\//g,'\\/').replace(/9/g,'\\d').replace(/a/g,'[a-zа-яё]').replace(/\*/g,'[a-zа-яё0-9]')+')','gi')}
	function N(c,j,x){
		for(var k=0,s='';k<L;k++)s+=$[k]||c||'_';
		I.value=s;
		x?0:I.sC(!j?i:0)
	}
	function D(e,p,i){
		p=I.gC();
		if (p[0]==p[1]) {
			if(e)p[1]++;
			else p[0]--
		}
		for(i=p[0];i<p[1];i++)
			if(!S[i]&&$[i]){
				$[i]=0;
				j--
			}
		return p
	}
	function V(){
		setTimeout(function(k){
				if (R(M).test(I.value)) {
					I.value=RegExp.$1;
					$=I.value.split('');
					for(k=j=0;k<L;k++)if(!S[k])j++
				}
				else N()
			},0)
	}
	function P(c){
		if (c<35&&c!=8||c==45) return 1;
		switch(c){
			case 8:		i=D()[0]; return 0;
			case 46:	i=D(1)[1]; return 0;
			case 35:	i = L; return 1;
			case 36:	i = 1;
			case 37:	if (i-=2<-1) i=-1;
			case 39:	if (++i>L) i=L; return 1;
			default:	i=I.gC()[0];
						while(i<L&&S[i]){i++}
						if (i==L) return 0;

						c = String.fromCharCode(c)
						if (R(M.charAt(i)).test(c)) {
							D(1);
							$[i++] = c;
							j++;
							while(i<L&&S[i]){i++}
						}
						return 0
		}
	}

	var d=document, c='character', y=-100000, L=M.length, G=!c, i=0, j=0, $=M.split(''), S=M.split('');

	for (var k=0;k<L;k++) if (/a|9|\*/.test($[k])) $[k]=S[k]=0;
	I = typeof I=='string' ? d.getElementById(I) : I;

	I.sC = function(l,g){
		if(this.setSelectionRange) this.setSelectionRange(l,l);
		else {
			g = this.createTextRange();
			g.collapse(true);
			g.moveStart(c,y);
			g.move(c,l);
			g.select();
		}
	}
	I.gC = function(r,b){
		if (this.setSelectionRange) return [this.selectionStart,this.selectionEnd];
		else {
			r = d['selection'].createRange();
			b = 0-r.duplicate().moveStart(c,y)
			return [b,b+r.text.length]
		}
	}
	I.onfocus = function(){
		setTimeout(function(){N(0,!j)},0)
	}
	I.onblur = function(){
		j ? N(' ',0,1) : this.value=''
	}
	I.onkeydown = function(e,c){
		e = e||event;
		c = e.keyCode||e.charCode;
		G = false;
		if (c==8||c==46) {
			G = true;
			P(c);
			N();
			return !G
		}
		else if (!window.netscape&&(c>34&&c<38||c==39)) P(c)
	}
	I.onkeypress = function(e){
		if (G) return G=!G;

		e = e||event;

		if (P(e.keyCode||e.charCode)) return !G;

		N();

		return G
	}

	if (d.all&&!window.opera) I.onpaste=V;
	else I.addEventListener('input',V,false)
}
