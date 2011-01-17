$(function(){
	var imgurl ="view/templates/img/";
	
	var veriationBorderColorDenied="#D444AC";
	var veriationBorderColorAccepted="#148202";
	var ordeneryBorderColor="#0088FF";	
	
	var disabledButtonTextColor="#CDD8EB";
	var disabledButtonBackgroundColor="#C6CFDC";
	var disabledButtonBorderColor="#505F73";

	var activeButtonTextColor="#FFF";
	var activeButtonBackgroundColor="#56b0ff";
	var activeButtonBorderColor="#0088FF";
	
	var showFlowing = false;
	var showHappyning = false;
	var showEvent = false;
	var showProfile = false;
	var showGroups = false;
	var showRegister = false;
	
	var flowing=undefined;	
	var events=undefined;
	var groups=undefined;	
	var profile=undefined;
	var happyning=undefined;
	
//	function CreateFormWithObjects(backName,frontName,frontName2,obejcts) {
//		this.backName = backName;
//		this.frontName = frontName;//Singular
//		this.frontName2 = frontName2;//Plural
//		
//		//objects från en array namn,typ
//		//createValidation
//		
//		this.validation = new superValidation(this.backName);
//		
//		this.input = CreateInput(this.backName,this.validation.validateInput());
//		this.submitButton= CreateSubmitButton(this.backName,this.frontName,this.validation.checkClick);
//		
//		this.form = $("<form/>").attr({ });
//		
//		this.hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'create'+this.name });		
//
//		
//		this.form.append(this.input,this.hiddenFunction,this.submitButton)
//		
//		return this.form;
//	}

	function CreateSubmitButton(name,headline,checkClicked) {
		this.name = name;
		console.debug(checkClicked);
		checkClicked = checkClicked;
		var headline = headline;
		this.createFormList = $("<dl/>");
		this.createDt = $("<dt/>");
		this.createDd = $("<dd/>");
		this.createSubmitButtonLabel = $("<lable/>").attr({ 'for':this.name+'SubmitButton',style:'display:none' }).text("Submit button");
		this.createSubmitButton = $("<input/>").attr({ id:this.name+'SubmitButton', name:this.name+'SubmitButton', type:'submit', value:'Skapa '+headline })
			.click(function(event){ 
				console.debug(checkClicked);
				if (checkClicked) //Controlling if name exist and verifers the name
					{						
					console.debug("Validation from",this.name);
//					$('#'+this.name+'Input').siblings(".denialMessage").text("Din "+headline+" är nu skapad").show();
//	
//					$('#'+this.name+'Input').css({'border':'solid 2px '+ordeneryBorderColor+''});
//					$('#'+this.name+'SubmitButton').attr("disabled", "true");
//					$('#'+this.name+'SubmitButton').css({'background-color':'#C6CFDC','border':'solid 2px #8499B1','color':'gray' });
//												
//					$.post("controller/form_handler_ajax.php?func=create"+this.name, { 'name':$('#'+this.name+'Input').val() }, function(data){
					//data kan inehålla id om man vill.
//					});
//					$('#'+this.name+'Input').val("");
					}
				
				event.preventDefault;
				return false;
			});		
		this.createDt.append(this.createSubmitButtonLabel);
		this.createDd.append(this.createSubmitButton);
		this.createDt.append(this.createDd);
		this.createFormList.append(this.createDt,this.hiddenFunction);
		
		return this.createFormList;
	}
	
	function CreateInput(name) {
		this.inputName = name;
		this.createFormList = $("<dl/>");
		this.createFormListDt = $("<dt/>");
		this.createFormListDd = $("<dd/>");
		this.createInputLabel = $("<lable/>").attr({ 'for':this.inputName+'Input',style:'display:none' }).text("Message");
		this.createInput = $("<input/>").attr({ id:''+this.inputName+'Input', name:''+this.inputName+'Input', type:'text' });
		this.createInputMessage = $("<div/>").addClass("denialMessage");
		this.createInput.keyup(function () {
			//Kontrollerar med hjälp av en timer så denna inte körs vid varje knapptryck.
//			superValidation($('#'+inputName+'Input'),inputName);//
			
			superValidation.validateInput($('#'+inputName+'Input'));
//			validation;
//			console.debug(validation);
		});

		this.createFormListDt.append(this.createInputLabel);
		this.createFormListDd.append(this.createInput,this.createInputMessage);
		this.createFormListDt.append(this.createFormListDd);
		this.createFormList.append(this.createFormListDt);
		
		return this.createFormList;
	}
	
	function CreateTextfield(name) {
		var inputName = name;
		this.createFormList = $("<dl/>");
		this.createFormListDt = $("<dt/>");
		this.createFormListDd = $("<dd/>");
		this.createInputLabel = $("<lable/>").attr({ 'for':this.name+'Input',style:'display:none' }).text("Message");
		this.createInput = $("<textarea/>").attr({ id:''+this.name+'Input', name:''+this.name+'Input' }).addClass("textFlow");
		this.createInputMessage = $("<div/>").addClass("denialMessage");
		this.validationCheck = new inputValidation($('#'+inputName+'Input'),inputName);
		
		this.createInput.keyup(function () {
			//Kontrollerar med hjälp av en timer så denna inte körs vid varje knapptryck.
			this.validationCheck.validateInput();
		});
		
		this.createFormListDt.append(this.createInputLabel);
		this.createFormListDd.append(this.createInput,this.createInputMessage);
		this.createFormListDt.append(this.createFormListDd);
		this.createFormList.append(this.createFormListDt);
		
		return this.createFormList;
	}
	
//	function GetSelectableListWithItemsFrom(target) {
//		this.target = target;
//		this.createListDt = $("<dt/>");
//		this.createListDd = $("<dd/>");
//		this.createInputLabel = $("<lable/>").attr({ 'for':this.name+'Input',style:'display:none' }).text("Message");
//		this.createSelectable = $("<selectable/>");
//		this.createSelectableOption = $("<option/>");
//		
//		
//		this.createFormListDt.append(this.createInputLabel);
//		this.createFormListDd.append(this.createInput,this.createInputMessage);
//
//		return this.createListDt;
//	}
	
	function ObjectContainer(name,headline){
		this.name=name;
		this.headline=headline;
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
			});
			
			return close;
		}
	
		var close = new closeButton();
		
		var headlineContainer = $("<h1/>").text(this.headline);
		
		var profileHeadline = $("<h1/>").text(headlineContainer);
		
		container.append(close,headlineContainer);
		
		this.formContainer = $("<form/>");
		this.leftContainer = $("<div/>").addClass("leftContainer");
		this.rightContainer = $("<div/>").addClass("rightContainer");
		this.Container = $("<div/>").addClass("centerContainer");
		this.footerContainer = $("<div/>").addClass("footContainer");
		
		$("#mainContainer").prepend(container);

		return {
			setShow: function() {
				this.show=true;
				container.attr({ style:'display:block' });
			},
			
			addFormContent : function(content) {
				formContainer.append(content);
			},
			
			addContent : function(content) {
				container.append(content);
			},
			moveToTop : function(content) {
				$("#mainContainer").prepend(container);
			}
		};
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

		
		$("#menu li").each( function (i) {
			$(this).click( function(event) {
				$.post("controller/get_page.php"+$(this).children('a').attr('href'), { 'page':"page" }, function(data){//controller/menu.php?func=getMenu
					
					if(data=="happyning") { //*** Happyning ***
						if (happyning===undefined) {
							happyning = new ObjectContainer("Happyning","Happyning");
						} else {
							happyning.moveToTop();
							happyning.setShow();
						}
					} else if (data=="flowing") { //*** Flowing ***
						if (flowing===undefined) {
							flowing = new ObjectContainer("Flowing","Flowing");
							
							flowing.addContent(CreateTextfield("Flowing"));
							flowing.addContent(CreateSubmitButtonAndHiddenFunction("Flowing","Flow"));
							
						} else {
							flowing.moveToTop();
							flowing.setShow();
						}

					} else if (data=="event") { //*** Event ***
						if (events==undefined) {
							events = new ObjectContainer("Event","Event");
							
							events.addContent(CreateInput("Event"));
							events.addContent(CreateSubmitButton("Event","Event","true"));
//							events.addContent(CreateSubmitButtonAndHiddenFunction("Event","Event"));
						} else {
							events.moveToTop();
							events.setShow();
						}
						
					} else if (data=="profile") { //*** Profile ***
						if (profile===undefined) {
							profile = new ObjectContainer("Profile","Profil");
							
						} else {
							profile.moveToTop();
							profile.setShow();
						}

					} else if (data=="groups") { //*** Groups ***
						if (groups===undefined) {
							groups = new ObjectContainer("Groups","Grupper");
							
							groups.addContent(CreateFormWithObjects("Groups","Grupper","Grupp"));
							
						} else {
							groups.moveToTop();
							groups.setShow();
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
						$("#mainContainer").prepend(register);
						
						
					}
				});
				event.preventDefault();
				return false;
			});
			
		});
		
	}, "json");
			
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
	
	function createInput(inputName,text,required) {
		var dt = $("<dt/>");

		var label = $("<label/>").attr({"for": inputName}).text(text);
		var dd = $("<dd/>");

		if (inputName=="password" || inputName=="password2") {
			var input = $("<input/>").attr({ name: ''+inputName+'', value: "", type:"password", id: ''+inputName+'' });
		} else if (inputName=="birthdate") {
			var input = $("<input/>").attr({ name: ''+inputName+'', value: "YYYY-MM-DD", type:"text", id: ''+inputName+'' });
		} else {
			var input = $("<input/>").attr({ name: ''+inputName+'', value: "", id: ''+inputName+'', type:"text" });
		}
		if (required) {
			requiredImage = $("<img/>").attr({			 
											src: imgurl+"requiredFiled.png",
											title: "Required Field",
											id: ''+inputName+'Checked',
											alt: "Required Field" }).addClass("requiredField");
			requiredImage.appendTo(dd);
		} else {
			optimalImage = $("<img/>").attr({
											src: imgurl+"optionalFiled.png",
											title: "Optional Field",
											id: ''+inputName+'Checked',
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

		
		function checkName(obj) {	
			var objectName = objectName;
	        var check = /^([A-Za-z\Å\Ä\Ö\å\ä\ö\-\_\*\^\.\,]{1,40} {0,1}){1,10}$/; //Namn regler
	        var value = obj.val(); //lägger in värdet i en variabel
	        
	        if (value.length>2) {
				if (check(value)) {
					$.post("controller/get_page.php?func=checkIf"+objectName+"Exist", { 'name':obj.val() }, function(returnedName){
						if (returnedName) {
							obj.focus(); //Fokuserar
							obj.css({'border':'solid 2px '+veriationBorderColorDenied });
							obj.siblings(".denialMessage").text("Tyvärr, namnet är redan upptaget").show();
							disableButton($("#"+objectName+"SubmitButton"));
							passed = false;
						} else {
							obj.css({'border':'solid 2px '+veriationBorderColorAccepted });
							obj.siblings(".denialMessage").hide();
							activateButton($("#"+objectName+"SubmitButton"));//groupSubmitButton ska fixas.
							passed = true;
						}
					});
				} else {
					obj.css({'border':'solid 2px '+veriationBorderColorDenied+''});
					obj.siblings(".denialMessage").text("Felaktig inmatning").show();
					disableButton($("#"+objectName+"SubmitButton"));
					passed = false;
				}
			} else {
				obj.css({'border':'solid 2px '+ordeneryBorderColor+''});
				disableButton($("#"+objectName+"SubmitButton"));
				passed = false;
			}
	        return true;
		}
		
		return {
			validateInput : superValidation,

			checkClick : function  () {
				return passed;
			}		
		}
		
	}
});