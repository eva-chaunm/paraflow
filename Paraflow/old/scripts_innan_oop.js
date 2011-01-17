$(function(){
	var imgurl ="view/templates/img/";
	
	var veriationBorderColorDenied="#D444AC";
	var veriationBorderColorAccepted="#148202";
	var ordeneryBorderColor="#0088FF";	
	
	var disabledButtonTextColor="#8499B1";
	var disabledButtonBackgroundColor="#C6CFDC";
	var disabledButtonBorderColor="#8499B1";

	var activeButtonTextColor="#FFF";
	var activeButtonBackgroundColor="#56b0ff";
	var activeButtonBorderColor="#0088FF";
	
	var showFlowing = false;
	var showHappyning = false;
	var showEvent = false;
	var showProfile = false;
	var showGroups = false;
	var showRegister = false;
	
	var profile=undefined;
	var happyning=undefined;
	
	
	function closeButton() {
		var close =  $("<img/>").attr({
			 src: imgurl+"close.png",
	        title: "Close",
	        alt: "Close"
		}).addClass("close");
		
		close.click(function(){ 									//Lägger till en click funktion på remove
			$(this).parent("div").attr({ style:'display:none' });
			this.show = false;
			console.debug(this.show);
		});
		
		return close;
	}
	
	function CreateSubmitButtonAndHiddenFunction(name) {
		this.createFormList = $("<dl/>");
		this.createDt = $("<dt/>");
		this.createDd = $("<dd/>");
		this.createSubmitButtonLabel = $("<lable/>").attr({ 'for':name+'SubmitButton',style:'display:none' }).text("Submit button");
		this.createSubmitButton = $("<input/>").attr({ id:name+'SubmitButton', name:name+'SubmitButton', type:'submit', value:'Skapa '+name })
			.click(function(event){ 
				if (checkClick()) //Controlling if name exist and verifers the name
					{										
					$('#'+name+'Input').siblings(".denialMessage").text("Din "+name+" är nu skapad").show();
	
					$('#'+name+'Input').css({'border':'solid 2px '+ordeneryBorderColor+''});
					$('#'+name+'SubmitButton').attr("disabled", "true");
					$('#'+name+'SubmitButton').css({'background-color':'#C6CFDC','border':'solid 2px #8499B1','color':'gray' });
												
					$.post("controller/form_handler_ajax.php?func=create"+name, { 'name':$('#'+name+'Input').val() }, function(data){
					//data kan inehålla id om man vill.
					});
					$('#'+name+'groupInput').val("");
					}
				
				event.preventDefault;
				return false;
			});
		this.hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'create'+name });
		
		this.createDt.append(this.createSubmitButtonLabel);
		this.createDd.append(this.createSubmitButton);
		this.createDt.append(this.createDd);
		this.createFormList.append(this.createDt,this.hiddenFunction);
		
		return this.createFormList;
	}
	
//	var createGroupHeadlineInput = $("<input/>").attr({ id:'groupInput', name:'groupInput', type:'text' });
//	var createGroupHeadlineInputMessage = $("<div/>").addClass("denialMessage").hide();
//	
//	createGroupHeadlineInput.keyup(function () {
//		//Kontrollerar med hjälp av en timer så denna inte körs vid varje knapptryck.
//		checkIfGroupNameExist($('#groupInput'));
//	});
	
	function CreateInput(name) {
		this.createFormList = $("<dl/>");
		this.createFormListDt = $("<dt/>");
		this.createFormListDd = $("<dd/>");
		
		this.createInputLabel = $("<lable/>").attr({ 'for':name+'Input',style:'display:none' }).text("Message");
		this.createInput = $("<input/>").attr({ id:''+name+'Input', name:''+name+'Input', type:'text' });
		this.createInputMessage = $("<div/>").addClass("denialMessage");
		this.createInput.keyup(function () {
			//Kontrollerar med hjälp av en timer så denna inte körs vid varje knapptryck.
			checkIfGroupNameExist($('#'+name+'Input'));
		});
		
		this.createFormListDt.append(this.createInputLabel);
		this.createFormListDd.append(this.createInput,this.createInputMessage);
		this.createFormListDt.append(this.createFormListDd);
		this.createFormList.append(this.createFormListDt);
		
		return this.createFormList;
	}
	
	function ObjectContainer(name){
		this.name=name;
		this.show=true;


		
		
		var container = $("<div/>").attr({ id:this.name+'Container' }).addClass("mainContainerObject");
		
		function closeButton() {
			var close =  $("<img/>").attr({
				 src: imgurl+"close.png",
		        title: "Close",
		        alt: "Close"
			}).addClass("close");
			
			close.click(function(){ 									//Lägger till en click funktion på remove
				$(this).parent("div").attr({ style:'display:none' });
				this.show = false;
				console.debug(this.show);
			});
			
			return close;
		}
		
//		function createFormAndContainer() {
//			var createFlow = $("<div>").addClass("createFlow");
//			var createFlowForm = $("<form/>").attr({ method:'post' });
//		}
//		
//		
//		function createInput() {
//			var createFlowFormList = $("<dl/>");
//			var createFlowFormListDt = $("<dt/>");
//			var createFlowFormListDd = $("<dd/>");
//			
//			var createFlowHeadlineInputLabel = $("<lable/>").attr({ 'for':'flowInput',style:'display:none' }).text("Message");
//			var createFlowHeadlineInput = $("<textarea/>").attr({ id:'flowInput', name:'eventInput' });
//			
//			createFlowFormListDt.append(createFlowHeadlineInputLabel);
//			createFlowFormListDd.append(createFlowHeadlineInput);
//			createFlowFormListDt.append(createFlowFormListDd);
//			createFlowFormList.append(createFlowFormListDt);
//		}
//			
		var close = new closeButton();
		
		var headline = $("<h1/>").text(this.name);
		
		var profileHeadline = $("<h1/>").text("Profile");
		
		container.append(close,headline);
		
		$("#mainContainer").prepend(container);

		return {
			setShow: function() {
				this.show=true;
				container.attr({ style:'display:block' });
			},
			
			addContent : function(content) {
				container.append(content);
			}
		}
	}
	
	
	 /*													
	  /}>----------------------------------------<{\ 
=>--<{]  Funktionalitet för att hämta hem menyn    [}>--<=
	  \}>----------------------------------------<{/
	 */											
	
	$.post("controller/menu.php?func=getMenu", { 'user_id':1 }, function(data){
		
			var menu = getChilds(data.menu);
			$("#menu").append( menu );
						
			$("#menu li").click(function( event ){
				var hidden = $(this).find("ul:first:hidden").size() != 0;
				
				$(this).siblings().find("ul").slideUp();
				$(this).siblings().find(".gotChilds").attr({ src: imgurl+"got_childs.png", title: "Show Childs", alt: "Show Child" });
				
				event.stopPropagation();
				
				if($(this).find("ul").size() != 0) {
					event.preventDefault();
				}

				if (hidden) {
					$(this).find("ul:first").slideDown();
					$(this).find(".gotChilds:first").attr({ src: imgurl+"show_childs.png", title: "Showing Childs", alt: "Showing Child" });
				}		
			});
		
		 /*													
		  /}>----------------------------------------<{\ 
		-{|  Skapande av register behållaren          <{[=-
		  \}>----------------------------------------<{/
		 */	
		
		$("li").find(".register").click(function(){ 



			return false;
		});
		
		 /*													
		  /}>----------------------------------------<{\ 
		-{|  Funktionalitet för att hämta hem menyn   <{[=-
		  \}>----------------------------------------<{/
		 */	
		
		$("#menu li").each( function (i) {
			$(this).click( function(event) {
//				console.debug($(this).children('a').text(),$(this).children('a').attr('href'));
				$.post("controller/get_page.php"+$(this).children('a').attr('href'), { 'page':"page" }, function(data){//controller/menu.php?func=getMenu
					
					if(data=="happyning") { //*** Happyning ***
						if (happyning===undefined) {
							happyning = new objectContainer("Happyning");
						} else {
							happyning.setShow();
						}
					} else if (data=="flowing") { //*** Flowing ***
	 					if (showFlowing) {
							$("#mainContainer").prepend($("#flowingContainer"));
							$("#flowingContainer").attr({ style:'display:show' });
						} else {
							showFlowing = true;
							var flowingContainer = $("<div/>").attr({ id:'flowingContainer' }).addClass("mainContainerObject");
							
							var close = closeButton();
							
							var flowObjects = $("<h1/>").text("Flow");

							
							
							var createFlow = $("<div>").addClass("createFlow");
							var createFlowForm = $("<form/>").attr({ method:'post' });
							var createFlowFormList = $("<dl/>");
							var createFlowFormListDt = $("<dt/>");
							var createFlowFormListDd = $("<dd/>");
							
							var createFlowHeadlineInputLabel = $("<lable/>").attr({ 'for':'flowInput',style:'display:none' }).text("Message");
							var createFlowHeadlineInput = $("<textarea/>").attr({ id:'flowInput', name:'eventInput' });
							
							createFlowFormListDt.append(createFlowHeadlineInputLabel);
							createFlowFormListDd.append(createFlowHeadlineInput);
							createFlowFormListDt.append(createFlowFormListDd);
							createFlowFormList.append(createFlowFormListDt);
							
							var createFlowFormListDt = $("<dt/>");
							var createFlowFormListDd = $("<dd/>");
							var createFlowSubmitButtonLabel = $("<lable/>").attr({ 'for':'flowSubmitButton',style:'display:none' }).text("Submit button");
							var createFlowSubmitButton = $("<input/>").attr({ id:'flowSubmitButton', name:'flowSubmitBotton', type:'submit', value:'Starta Flow' })
								.click(function(event){ 
									//controlling name
									//adding event to DB
									//Updating flowing list if exist.
									console.debug($('#flowInput').val());
	//								alert("Skapar event"+$(this).sibblings('#eventInput').val());
									event.preventDefault;
									return false;
								});
							
							createFlowFormListDt.append(createFlowSubmitButtonLabel);
							createFlowFormListDd.append(createFlowSubmitButton);
							createFlowFormListDt.append(createFlowFormListDd);
							createFlowFormList.append(createFlowFormListDt);
							
							var hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'createFlow' });
							
							createFlowForm.append(createFlowFormList,hiddenFunction);
							createFlow.append(createFlowForm);
							
							flowingContainer.append(close,flowObjects,createFlow);
							
							$("#mainContainer").prepend(flowingContainer);	
						}
					} else if (data=="event") { //*** Event ***
						if (showEvent) {
							$("#mainContainer").prepend($("#eventContainer"));
							$("#eventContainer").attr({ style:'display:show' });
						} else {
							showEvent=true;
							var eventContainer = $("<div/>").attr({ id:'eventContainer' }).addClass("mainContainerObject");
							
							var close = closeButton();
							
							var eventHeadline = $("<h1/>").text("Event");
							
							
							var otherEventsUl = $("<ul/>");
							var otherEventsLi = $("<li/>").text("Other events");
							otherEventsUl.append(otherEventsLi);
							
							var myEventsUl = $("<ul/>");
							var myEventsLi = $("<li/>").text("My events");
							myEventsUl.append(myEventsLi);
							
							var createEvent = $("<div>").addClass("createEvent");
							var createEventForm = $("<form/>").attr({ method:'post' });
							var createEventFormList = $("<dl/>");
							var createEventFormListDt = $("<dt/>");
							var createEventFormListDd = $("<dd/>");
							
							var createEventHeadlineInputLabel = $("<lable/>").attr({ 'for':'eventInput' }).text("Headline");
							var createEventHeadlineInput = $("<input/>").attr({ id:'eventInput', name:'eventInput', type:'text' }).addClass("standardInput");
							
							createEventFormListDt.append(createEventHeadlineInputLabel);
							createEventFormListDd.append(createEventHeadlineInput);
							createEventFormListDt.append(createEventFormListDd);
							createEventFormList.append(createEventFormListDt);
							
							
							var createEventFormListDt = $("<dt/>");
							var createEventFormListDd = $("<dd/>");
							var createEventSubmitButtonLabel = $("<lable/>").attr({ 'for':'eventSubmitButton',style:'display:none' }).text("Submit button");
							var createEventSubmitButton = $("<input/>").attr({ name:'eventSubmitBotton', type:'submit', value:'Skapa Event' })
								.click(function(event){ 
									//controlling name
									//adding event to DB
									//Updating flowing list if exist.
									console.debug($('#eventInput').val());
	//								alert("Skapar event"+$(this).sibblings('#eventInput').val());
									event.preventDefault;
									return false;
								}).addClass("submitButton");
							
							createEventFormListDt.append(createEventSubmitButtonLabel);
							createEventFormListDd.append(createEventSubmitButton);
							createEventFormListDt.append(createEventFormListDd);
							createEventFormList.append(createEventFormListDt);
							
							var hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'createEvent' });
							
							createEventForm.append(createEventFormList,hiddenFunction);
							createEvent.append(createEventForm);
							
							eventContainer.append(close,eventHeadline,otherEventsUl,myEventsUl,createEvent);
							
							$("#mainContainer").prepend(eventContainer);
						}
					} else if (data=="profile") { //*** Profile ***
						if (profile===undefined) {
							profile = new ObjectContainer("Profile");
							
							profile.addContent(CreateInput("Profile"));
							profile.addContent(CreateSubmitButtonAndHiddenFunction("Profile"));
							
							console.debug(profile.prototypee);
						} else {
							profile.setShow();
						}

					} else if (data=="groups") { //*** Groups ***
						if (showGroups) {
							$("#mainContainer").prepend($("#groupsContainer"));
							$("#groupsContainer").attr({ style:'display:show' });
						} else {
							showGroups=true;
							var groupsContainer = $("<div/>").attr({ id:'groupsContainer' }).addClass("mainContainerObject");
							
							var close = closeButton();
							
							var groupHeadline = $("<h1/>").text("Groups");
							
							var otherGroupsUl = $("<ul/>");
							var otherGroupsLi = $("<li/>").text("Other groups");
							otherGroupsUl.append(otherGroupsLi);
							
							var myGroupsUl = $("<ul/>");
							
							
							
							
							var myGroupsLi = $("<li/>").text("My groups");
							
							
							
							myGroupsUl.append(myGroupsLi);
							
							var createGroup = $("<div/>").addClass("createGroup");
							var createGroupForm = $("<form/>").attr({ method:'post' });
							var createGroupFormList = $("<dl/>");
							var createGroupFormListDt = $("<dt/>");
							var createGroupFormListDd = $("<dd/>");
							
							var createGroupHeadlineInputLabel = $("<lable/>").attr({ 'for':'groupInput' }).text("Headline");
							var createGroupHeadlineInput = $("<input/>").attr({ id:'groupInput', name:'groupInput', type:'text' });
							var createGroupHeadlineInputMessage = $("<div/>").addClass("denialMessage").hide();
							
							createGroupHeadlineInput.keyup(function () {
								//Kontrollerar med hjälp av en timer så denna inte körs vid varje knapptryck.
								checkIfGroupNameExist($('#groupInput'));
							});
							
							createGroupFormListDt.append(createGroupHeadlineInputLabel);
							createGroupFormListDd.append(createGroupHeadlineInput,createGroupHeadlineInputMessage);
							createGroupFormListDt.append(createGroupFormListDd);
							createGroupFormList.append(createGroupFormListDt);
							
							var createGroupFormListDt = $("<dt/>");
							var createGroupFormListDd = $("<dd/>");
							var createGroupSubmitButtonLabel = $("<lable/>").attr({ 'for':'groupSubmitButton',style:'display:none' }).text("Submit button");
							var createGroupSubmitButton = $("<input/>").attr({ id:'groupsSubmitButton', name:'groupsSubmitButton', type:'submit', value:'Skapa Grupp' })
								.click(function(event){ 
									if (checkClick()) //Controlling if name exist and verifers the name
										{										
										$('#groupInput').siblings(".denialMessage").text("Din grupp är nu skapad").show();

										$('#groupInput').css({'border':'solid 2px '+ordeneryBorderColor+''});
										$("#groupsSubmitButton").attr("disabled", "true");
										$("#groupsSubmitButton").css({'background-color':'#C6CFDC','border':'solid 2px #8499B1','color':'gray' });
																	
										$.post("controller/form_handler_ajax.php?func=createGroup", { 'group_name':$('#groupInput').val() }, function(data){
										//data kan inehålla grupp id om man vill.
											console.debug(data);
										});
										$('#groupInput').val("");
										}
									
									event.preventDefault;
									return false;
								});
							
							createGroupFormListDt.append(createGroupSubmitButtonLabel);
							createGroupFormListDd.append(createGroupSubmitButton);
							createGroupFormListDt.append(createGroupFormListDd);
							createGroupFormList.append(createGroupFormListDt);
							
							var hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'createGroup' });

							createGroupForm.append(createGroupFormList);
							createGroup.append(createGroupForm,hiddenFunction);
							
							groupsContainer.append(close,groupHeadline,otherGroupsUl,myGroupsUl,createGroup);
							
						
							$("#mainContainer").prepend(groupsContainer);
						}
					} else if (data="register") {
						if ($("#register").length != 0) {	
							$("#register").css({ opacity:"1", display:"block" });
						} else {

							var close = closeButton();
							
							var register = $("<div/>").attr('id','register').addClass("mainContainerObject");
							var headline = $("<h1/>").text("Regristrering");
							var dl = $("<dl/>");
							
							var container = $("<div/>").addClass("container"); 
							var footer = $("<div/>").addClass("footer"); 
							var leftDiv = $("<div/>").addClass("left");
							var rightDiv = $("<div/>").addClass("right");
							var form = $("<form/>").attr({ action:'controller/form_handler.php',method:'post'});
							
							//Vänstra fältet
							createInput("first_name","Förnamn",true).appendTo(dl);
							createInput("last_name","Efternamn",true).appendTo(dl);
							createInput("email","E-Post",true).appendTo(dl);
							createInput("password","Lösenord",true).appendTo(dl);
							createInput("password2","Upprepa lösenordet",true).appendTo(dl);
							dl.appendTo(leftDiv);
							
							//Högra fältet
							var dl = $("<dl/>");
							createInput("alias","Användarnamn",true).appendTo(dl);	
							createInput("skype","Skype",false).appendTo(dl);
							createInput("country","Land",false).appendTo(dl);
							createInput("city","Stad",false).appendTo(dl);
							
							var dt = $( "<dt/>" );
							var label = $( "<label>" ).attr({"for": "birthdate"}).text("Födelsedatum");
							var dd = $( "<dd/>" );
							
							var input = $( "<input/>" ).attr({ name: 'birthdate', id:"birthdate" });
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
							input.appendTo( dd );			    
						    optimalImage = $("<img/>").attr({ 						 
								src: imgurl+"optionalFiled.png",
								title: "Optional Field",
								id: 'birthdateChecked',
								alt: "Optional Field" }).addClass("optionalField");
						    optimalImage.appendTo(dd);
							label.appendTo( dt );

							dd.appendTo( dt );
											
							dt.appendTo(dl);		
							
							dl.appendTo(rightDiv);
							var hidden = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'register' });

							var submitButton = $("<input/>").attr({ type:'Submit', id:'submitRegisterFormButton', value:'Regristrera' }).click(function(){
								validation=true;
								$("#register input").each(function (i){						
									if (!validate($(this))) {
										validation=false;
									}
								});					
								if (!validation) {
									return false;
								} else {
									console.debug("true");
								}
							});
							
							footer.append(submitButton,hidden);
							
							container.append(leftDiv,rightDiv,footer);
							container.appendTo(form);
							form.appendTo(register);
							
							register.prepend(close,headline);

						}
						console.debug(register);
						$("#mainContainer").prepend(register);
						
						
					}


					$(data).each(function (i) {
						console.debug(data,"trallala");
//						$("#maiContainer").children.remove(); //Kontroll innan om man vill spara.
						$("#mainContainer").prepend(data[0].ggg);
						console.debug(data);
					});
				});
				event.preventDefault();
				return false;
			});
			
		});
		
	}, "json");
	

	function getTargets() {
		
		
	}
	
	function getEvents() {
		
		
	}
	
	function getEvent() {
		
		
	}
		
	function passedValidation(obj) {
		
		$("#"+obj.attr('id')+"Checked").attr({ src:imgurl+"validatedFiled.png" });
//		obj.animate({borderColor:'#148202'},1000);
		obj.css({'border':'solid 2px #148202'});
	
	}
		
	function deniedValidation(obj) {
		$("#"+obj.attr('id')+"Checked").attr({ src:imgurl+"failedValidation.png" });
    	obj.css({'border':'solid 2px #D444AC'});
//		obj.animate({borderColor:'#D444AC'},1000);

	}
	
	function validate(obj) {
        if(obj.attr('id') == 'email') {
            var check = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            //kontrollerar om e-posten finns i databasen
        } else if (obj.attr('id') == "first_name" || obj.attr('id') == "last_name")
            var check = /^[A-Za-z\Å\Ä\Ö\å\ä\ö]{2,40} ?[A-Za-z\Å\Ä\Ö\å\ä\ö]{0,40} ?[A-Za-z\Å\Ä\Ö\å\ä\ö]{0,40}$/;
        else if (obj.attr('id') == "birthdate")
            var check = /^[1-2]{1}[09]{1}[0-9]{2}\-[0-1]{1}[0-9]{1}\-[0-3]{1}[0-9]{1}$/;
        else if (obj.attr('id') == "password" || obj.attr('id') == "password2" || obj.attr('id') == "skype") 
        	var check = "exception";
        else
            var check = undefined;                
            
        if (check != undefined && check != "exception")
        {
            if(check(obj.val()))
            	passedValidation(obj);
            else
            	deniedValidation(obj);
            return check(obj.val());

        }
        else if  (obj.attr('id') == "submitRegisterFormButton") {
        	return true;
        } else if  (obj.attr('id') == "password" || obj.attr('id') == "password2") { //Kollar så att båda lösenorden stämmer
            if(obj.val().length> 4 && (obj.val() == $("#password").val() || obj.val() == $("#password2").val())) {
            	passedValidation(obj);
            	if ($("#password").val()!=$("#password2").val()) {
            		$("#password2").css({'border':'solid 2px #D444AC' });
            	} else {
                    return true;
            		$("#password2Checked").attr({ src:imgurl+"validatedFiled.png" });
            	}
            } else {
            	deniedValidation(obj);
            return false;
            }
            
        } else if  (obj.attr('id') == "skype" || obj.attr('id') == "country" || obj.attr('id') == "city") { //Skype är inte obligatoriskt, men skriver man in måste det vara längre än 3 bokstäver
            if(obj.val().length == 0 || obj.val().length > 3)
            	passedValidation(obj);
            else
            	deniedValidation(obj);
                
            var output = (obj.val().length> 0) || false;
            return true;
            
        } else	{
            if(obj.val().length > 2)
            	passedValidation(obj);
            else
            	deniedValidation(obj);

            var output = (obj.val().length> 2) || false;
            return true;
        }
        
	}
	
	function createInput(name,text,required) {
		var dt = $("<dt/>");

		var label = $("<label/>").attr({"for": name}).text(text);
		var dd = $("<dd/>");

		
		if (name=="password" || name=="password2") {
			var input = $("<input/>").attr({ name: ''+name+'', value: "", type:"password", id: ''+name+'' });
		} else if (name=="birthdate") {
			var input = $("<input/>").attr({ name: ''+name+'', value: "YYYY-MM-DD", type:"text", id: ''+name+'' });
		} else {
			var input = $("<input/>").attr({ name: ''+name+'', value: "", id: ''+name+'', type:"text" });
		}
		if (required) {
			requiredImage = $("<img/>").attr({			 
											src: imgurl+"requiredFiled.png",
											title: "Required Field",
											id: ''+name+'Checked',
											alt: "Required Field" }).addClass("requiredField");
			requiredImage.appendTo(dd);
		} else {
			optimalImage = $("<img/>").attr({
											src: imgurl+"optionalFiled.png",
											title: "Optional Field",
											id: ''+name+'Checked',
											alt: "Optional Field" }).addClass("optionalField");
			optimalImage.appendTo(dd);
		}
	    input.keyup(function() { validate($(this));});
	    input.blur(function() { validate($(this));});
	
		label.appendTo(dt);
		input.prependTo(dd);
		dd.appendTo(dt);
		return dt;
	}

	function getChilds( menu ) {
		if (menu) 
		{
			var ul = $("<ul/>");
			$(menu).each(function (j) {			
				var childMenu = "";
				if (menu[j].child) {
					childMenu = getChilds(menu[j].child);
				}
					
				var li = $("<li/>");
	
				if (childMenu) {
					var link = $("<h1/>").append(menu[j].lable);	
					
					var img =  $("<img/>").attr({ src: imgurl+"got_childs.png", title: "Show Childs", alt: "Show Child" }).addClass("gotChilds");
					link.prepend( img );
	
					$( li ).append( link );
					childMenu.hide();
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
	
	
	var passed = false;
//	click(){
//		return passed;
//	}
	
	function disableButton(obj) {		
		obj.attr("disabled", "true");
		obj.css({ 'background-color':disabledButtonBackgroundColor,'border':'solid 2px '+disabledButtonBorderColor,'color':disabledButtonTextColor });
	}
	
	function activateButton(obj) {
		obj.removeAttr('disabled');
		obj.css({'background-color':activeButtonBackgroundColor,'border':'solid 2px '+activeButtonBorderColor,'color':activeButtonTextColor });
	}
	
	function checkClick () {
		return passed;
	}
	
	function checkIfGroupNameExist (obj) {	
//		console.debug(obj);
        var check = /^([A-Za-z\Å\Ä\Ö\å\ä\ö\-\_\*\^\.\,]{1,40} {0,1}){1,10}$/; //Namn regler
        var value = obj.val(); //lägger in värdet i en variabel
        
        if (value.length>2) {
			if (check(value)) {
				$.post("controller/get_page.php?func=checkIfGroupExist", { 'group_name':obj.val() }, function(group_name){
					if (group_name) {
						obj.focus(); //Fokuserar
						obj.css({'border':'solid 2px '+veriationBorderColorDenied });
						obj.siblings(".denialMessage").text("Tyvärr, namnet är redan upptaget").show();
						disableButton($("#groupsSubmitButton"));
						passed = false;
					} else {
						obj.css({'border':'solid 2px '+veriationBorderColorAccepted });
						obj.siblings(".denialMessage").hide();
						activateButton($("#groupsSubmitButton"));//groupSubmitButton ska fixas.
						passed = true;
					}
				});
			} else {
				obj.css({'border':'solid 2px '+veriationBorderColorDenied+''});
				obj.siblings(".denialMessage").text("Felaktig inmatning").show();
				disableButton($("#groupsSubmitButton"));
				passed = false;
			}
		} else {
			obj.css({'border':'solid 2px '+ordeneryBorderColor+''});
			disableButton($("#groupsSubmitButton"));
			passed = false;
		}
        return true;
	}
	
});