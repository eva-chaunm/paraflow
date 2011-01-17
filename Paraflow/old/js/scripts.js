$(function(){
	var imgurl ="view/templates/img/";
	$.post("controller/menu.php?func=getMenu", { 'user_id':1 }, function(data){
//		console.debug(data);
//		console.debug(data[0].label);
//		console.debug(data);

		$(data).each(function (i) {
			console.debug(data[i].child);
			
			var childMenu = getChilds(data[i].child);
			var menu = $("<li>");

			console.debug(childMenu);
			if (childMenu) {
				var link = $("<h1/>").append(data[i].lable);	
				var img =  $("<img/>").attr({
					 src: imgurl+"got_childs.png",
			         title: "Show Childs",
			         alt: "Show Child"
				}).addClass("gotChilds");
				link.prepend( img );				
			} else {
				if (data.menu[i].class) {
					var link = $("<a/>").attr("href", data[i].link).text(data[i].lable).addClass("register");
				} else {
					var link = $("<a/>").attr("href", data[i].link).text(data[i].lable);
				}
			}
			$( menu ).append( link );
			
			if (childMenu) {
				$( menu ).append( childMenu );
			}

			$("#myMenu").append( menu );
			
			$("#myMenu ul").hide();
			
			$("#myMenu li").click(function( event ){
				var hidden = $(this).find("ul:first:hidden").size() != 0;
				
				$(this).siblings().find("ul").slideUp();
				$(this).siblings().find(".gotChilds").attr({
					 src: imgurl+"got_childs.png",
			         title: "Show Childs",
			         alt: "Show Child"
				});
				
				event.stopPropagation();
				
				if($(this).find("ul").size() != 0) {
					event.preventDefault();
				}

				if (hidden) {
					$(this).find("ul:first").slideDown();
					$(this).find(".gotChilds:first").attr({
						 src: imgurl+"show_childs.png",
				         title: "Showing Childs",
				         alt: "Showing Child"
					});
				}		
			});
		});
		$("li").find(".register").click(function(){ 

			var box = $("<div/>").attr('id','box');
			
			if ($("#register").length != 0) {	
				$("#register").css({
					opacity:"0.0",
					display:"block"
				});
			} else {

				var register = $("<div/>").attr('id','register');
				var headline = $("<h1/>").text("Regristrera");
				var dl = $("<dl/>");
				
				
				var container = $("<div/>").addClass("container"); 
				var footer = $("<div/>").addClass("footer"); 
				var leftdiv = $("<div/>").addClass("left");
				var rightdiv = $("<div/>").addClass("right");
				var form = $("<form/>").attr({
											action:'?action=submit',
											method:'post'
											});
				
				//Vänstra fältet
				dt = createinput("firstname","Förnamn");
				dt.appendTo(dl);
	
				dt = createinput("lastname","Efternamn");
				dt.appendTo(dl);
			
				dt = createinput("email","E-Post");
				dt.appendTo(dl);
	
				dt = createinput("skype","Skype");
				dt.appendTo(dl);		
				
				dt = createinputpassword("password","Lösenord");
				dt.appendTo(dl);		
				dt = createinputpassword("password","Upprepa lösenordet");
				dt.appendTo(dl);		
				
				dl.appendTo(leftdiv);
				
				//Högra fältet
				var dl = $("<dl/>");
	
				dt = createinput("alias","Alias");
				dt.appendTo(dl);
	
				dt = createinput("country","Country");
				dt.appendTo(dl);
			
				dt = createinput("city","City");
				dt.appendTo(dl);
				
				
				var dt = $( "<dt/>" );
				var label = $( "<label>" ).attr({
					"for": "birthdate"}).text("Födelsedatum");
				var dd = $( "<dd/>" );
				
				var input = $( "<input/>" ).attr({
					name: 'birthdate',
					id: "birthdate"
				});
				
				input.datepicker({
					changeYear: true,
					changeMonth: true,
					dateFormat: "yy-mm-dd",
					maxDate: "+1Y",
					yearRange: '1900:2011',
					firstDay: 1

				});
			    input.keyup(function() { validate($(this));});
			    input.change(function() { validate($(this));});
			    
				label.appendTo( dt );
				input.appendTo( dd );
				dd.appendTo( dt );
				
				//dt = createinput("birthdate","Födelsedatum");
				
				dt.appendTo(dl);		
				
				dl.appendTo(rightdiv);
				
				var button = $("<input/>").attr({
												type:'Submit',
												id:'button',
												value:'Skicka'
												});
				button.click(function(){
					validation=true;
					$("#register input").each(function (i){						
						if (!validate($(this))) {
							validation=false;
						}
					});					
					if (!validation) {
						return false;
					}
						
				});
				
				footer.append(button);
				
				container.append(leftdiv);
				container.append(rightdiv);
				container.append(footer);
				container.appendTo(form)
				form.appendTo(register);
				
				headline.prependTo(register);
			}
			
			box.click(function(){
				$("#register").animate({opacity:"0.0"}, 200,
					function(){ $(this).hide(); });		
				$(this).animate({opacity:"0.0"}, 200,
					 function(){ $(this).remove(); });			
			});

			$("body").prepend(box);

			$("body #box").animate({opacity:"0.7"}, 1000,
				function(){
					$("body").prepend(register);
					$("#register").css({top:'50%',left:'50%',margin:'-'+($('#register').height() / 2)+'px 0 0 -'+($('#register').width() / 2)+'px'});
					$("#register").animate({opacity:"1"});
				});			
			
			return false;
		});

		
		$("#myMenu").each( function (i) {
			console.debug($(this),"hittade något");
			$(this).click( function(event) {
				$.post("get_page.php", { 'page':$(this).attr('class') }, function(data){//controller/menu.php?func=getMenu
					$(data).each(function (i) {
						$("#displayer").children.remove(); //Kontroll innan om man vill spara.
						$("#displayer").append(data.text);
					});
				});
				event.preventDefault();
				return false;
			});

			
		});
		
		
		
	}, "json");
	
	$("#searchfield").keyup(function() {									//Letar upp # och skapar den funktion som ska köras på CLICK
		
		$("#result dl").children().remove();								// Tömmer all info i DL
		
		if ($("#result dl").length == 0) { 									//Kontrollerar om DL redan existerar
			var dl = $("<dl/>");											//Om inte skapas DL
		} else {
			dl=$("#result dl");												//Annars hämtas tidigare resultat hem och placeras i DL
		}
		
		var val = $("#searchfield").val(); 									//Hämtar upp världet från # med hjälp av .val
		$.post("books.php?func=search", {'string' : val},function(data){ 	//Kör AJAX funtionen POST med JQUERY
		
			for(i=0;i<data.length;i++){ 
				var show = $("<span/>").text(data[i].title);
				var dt = $("<dt/>");
				
				var remove =  $("<img/>").attr({
					 src: imgurl+"remove.png",
			         title: "Remove",
			         alt: "Remove"
				}).addClass("remove"); 								//Skapar en bild som man kan trycka på för att ta bort enstaka poster

				var add =  $("<img/>").attr({
					 src: imgurl+"add.png",
			         title: "Add",
			         alt: "Add"
				}).addClass("add"); 								//Skapar en bild som man kan trycka på för att ta bort enstaka poster

				var dd = $("<dd/>").text(data[i].review).hide();			//Döljer DD
				
				remove.click(function(){ 									//Lägger till en click funktion på remove
					$(this).parent("dt").remove();							//Tar bort föräldern, funkar på dt.append(remove);
				});
				
				add.click(function(){ 
					var up =  $("<img/>").attr({
						 src: imgurl+"up.png",
				         title: "Move Up",
				         alt: "Move Up"
					}).addClass("moveup"); 
					var down =  $("<img/>").attr({
						 src: imgurl+"down.png",
				         title: "Move Down",
				         alt: "Move Down"
					}).addClass("movedown"); 
					var remove =  $("<img/>").attr({
						 src: imgurl+"remove.png",
				         title: "Remove",
				         alt: "Remove"
					}).addClass("remove"); 
					
					var post=$(this).next();
					var dt = $("<dt>");
					
					var buttoncontainer = $("<div>").addClass("button_container"); 
					
					post.clone().appendTo(dt);
					
					remove.click(function(){ 									//Lägger till en click funktion på remove
						dt.remove();							//Tar bort föräldern, funkar på dt.append(remove);
					});
					
					up.click(function(){ 									//Lägger till en click funktion på remove
						$("#thechosen dl").prepend(dt);					
					});
					
					down.click(function(){ 									//Lägger till en click funktion på remove
						
						$("#thechosen dl").append(dt).first;					
					});
					
					buttoncontainer.prepend(up);
					buttoncontainer.prepend(down);
					buttoncontainer.prepend(remove);
					
					dt.prepend(buttoncontainer);
					
					dt.children("dd").css("display","block");
					
					dt.appendTo($("#thechosen dl"));
				});
				
				show.click(function( event ){ 								//Sätter en click funktion på DT 		
					$(this).next().next().next().slideToggle(); 					//Vad som ska hända i funktionen
				});
				
				dt.append(show); 
				dt.append(remove); 
				dt.append(add); 
				dt.append(dd); 												//Lägger till DD objektet (som även är satt dolt) till DT
				dl.append(dt); 	
				
				$("#result").append(dl); 									//Lägger objektet där ID = Resultat
			}
		},"json"); 															//Berättar att datan som hämtats ska bearbetats som JSON
	});
	$("#removebutton").click(function(){ 
		$("#result dl").remove();											// Tömmer all info i DL
	});
	
	function validate(obj) {
        if(obj.attr('id') == 'email')
            var check = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        else if (obj.attr('id') == "firstname" || obj.attr('id') == "lastname")
            var check = /^[A-Za-z\å\ä\ö\Å\Ä\Ö]{2,40} ?[A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40} ?[A-Za-z\å\ä\ö\Å\Ä\Ö]{0,40}$/;
        else if (obj.attr('id') == "birthdate")
            var check = /^[1-2]{1}[09]{1}[0-9]{2}\-[0-1]{1}[0-9]{1}\-[0-3]{1}[0-9]{1}$/;
        else
            var check = undefined;                
            
        if (check != undefined)
        {
            if(check(obj.val()))
            	obj.css({'background-color':'#66FF99'});
            else
            	obj.css({'background-color':'#FFCCFF'});
            return check(obj.val());

        }
        else if  (obj.attr('id') == "button") {
        	return true;
        } else	{
        
            if(obj.val().length > 0)
            	obj.css({'background-color':'#66FF99'});
            else
            	obj.css({'background-color':'#FFCCFF'});
                
            var output = (obj.val().length> 0) || false;
            return output;
        }
	}
	
	function createinput(name,text) {
		var dt = $("<dt/>");
		var label = $("<label>").attr({
			"for": name}).text(text);
		var dd = $("<dd/>");
		var input = $("<input/>").attr({
				name: ''+name+'',
				value: "",
				id: ''+name+''
			});
	    input.keyup(function() { validate($(this));});
	    input.blur(function() { validate($(this));});
	
		label.appendTo(dt);
		input.appendTo(dd);
		dd.appendTo(dt);
		return dt;
	}

	function createinputpassword(name,text) {
		var dt = $("<dt/>");
		var label = $("<label>").attr({
			"for": name}).text(text);
		var dd = $("<dd/>");
		var input = $("<input/>").attr({
				name: ''+name+'',
				value: "",
				type: "password",
				id: ''+name+''
			});
	    input.keyup(function() { validate($(this));});
	    input.blur(function() { validate($(this));});
		label.appendTo(dt);
		input.appendTo(dd);
		dd.appendTo(dt);
		return dt;
	}
	
	function getChilds( menu ) {
		if (menu) 
		{
			var ul = $("<ul/>");
			$(menu).each(function (j) {			
				var childMenu = "";
				console.debug(menu[j].child);
				if (menu[j].child) {
					childMenu = getChilds(menu[j].child);
				}
					
				var li = $("<li/>");
	
				if (childMenu) {
					var link = $("<h1/>").append(menu[j].lable);	
					
					var img =  $("<img/>").attr({
						 src: imgurl+"got_childs.png",
				         title: "Show Childs",
				         alt: "Show Child"
					}).addClass("gotChilds");
					link.prepend( img );
	
					$( li ).append( link );
					li.append(childMenu);
				} else {
					var link = $("<a/>").attr("href", menu[j].link).text(menu[j].lable);
					$( li ).append( link );	
				}
				$( ul ).append( li );
			  });	
		}
		return ul;
	}
});