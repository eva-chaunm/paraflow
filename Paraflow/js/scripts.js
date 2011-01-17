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
	
	var titleRegexp = /^([A-Za-z\Å\Ä\Ö\å\ä\ö\-\_\*\^\.\,]{1,40} {0,1}){1,10}$/;
	var emailRegexp = /^([A-Za-z0-9_\.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	var nameRegexp = /^([A-Za-z\Å\Ä\Ö\å\ä\ö\-\_\*\^\.\,]{1,40} {0,1}){1,5}$/;
	var digitRegexp = /[0-9]+/;
	
	var showFlowing = false;
	var showHappyning = false;
	var showEvent = false;
	var showProfile = false;
	var showGroups = false;
	var showRegister = false;
	
	var ObjectFlow=undefined;	
	var ObjectEvent=undefined;
	var ObjectGroup=undefined;	
	var profile=undefined;
	var ObjectRegister=undefined;
	
	var lightbox = $("<div/>").attr({'id':'lightbox'})
	var messageContainer = $("<div/>").attr({'id':'popup'})
	var headline = $("<h1/>").text("Välkommen");
	var text = $("<p/>").text("Ditt konto är nu skapat, välkommen.")
	
						ObjectNewUser = new ObjectContainer("NewUser","Välkommen");

//						ObjectHeadline = new CreateHeadline("Välkommen");

						ObjectWelcomeText = new CreateParagraph("Det här är ParaFlow","welcomeText");

						ObjectViewGroups = new ViewGroups();

//						ObjectNewUser.addObject(ObjectHeadline.getElement);
						ObjectNewUser.addObject(ObjectViewGroups.getGroups);

						ObjectNewUser.addObject(ObjectWelcomeText.getElement);
						
						$("#mainContainer").prepend(ObjectNewUser.getObject);

	
//	messageContainer.append(headline,text);
//	$("body").append(messageContainer);
//	$("body").append(lightbox);
//	console.debug($('#lightbox').height(),$('#lightbox').width())
//	$("#popup").css({ top:(($('#lightbox').height() / 2)-($("#popup").height()/1.5)),left:(($('#lightbox').width() / 2))-(200) });
//
//	
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //   Object Container    //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function ObjectContainer(objectName,headline) {
		var objectName = objectName;
		this.name=objectName;
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
		
		function setShow() {
			show = true;
			container.attr({ style:'display:block' });

		}
		
		function moveToTop() {
			$("#mainContainer").prepend(container);
		}
		
		function addObject(objekt) {
			container.append(objekt);
		}
		
		return {
			moveToTop : moveToTop,
			setShow : setShow,
			getObject : container,
			addObject : addObject,
			getName : objectName
		};
	}
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //      Headline         //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateHeadline(headline) {
		var h1 = $("<h1/>").text(headline);
		
		function getElement() {
			return h1;
		}
		
		return {
			getElement : getElement
		};
	}
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //      Paragraf         //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	function CreateParagraph(paragraph,pClass) {
		var p = $("<p/>").text(paragraph).addClass(pClass);
		
		function getElement() {
			return p;
		}
		
		return {
			getElement : getElement
		};
	}
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //      Form Class       //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateForm(name) {
		var form = $("<form/>");
			
		var inputArray = new Array();

		var submitButton = $("<input/>").attr({ type:'submit', value:"Skapa "+name });

		submitButton.click(function(event){	
			var allValidated = true;
			
			for (i=0;i<=inputArray.length-1;i++) {
				if (!(validate(inputArray[i])))
					allValidated = false;
			}
			
			if (allValidated==true) { //Skapar "name".
				$.post("controller/form_handler_ajax.php?func=create"+name, form.serialize(), function(data){
					console.debug(data['added']);
					if (data['added']=="group") {
						console.debug("Du har skapat en ny;",name)
						for (i=0;i<=inputArray.length-1;i++) {
							inputArray[i].resetElement();
						}
						console.debug("Stäng containern och gå till det som skapats");
						var lightbox = $("<div/>").attr({'id':'lightbox'})
						var messageContainer = $("<div/>").addClass("messageContainer");
						var headline = $("<h1/>").text("Välkommen");
						var text = $("<p/>").text("Ditt konto är nu skapat, välkommen.")
						
						ObjectNewUser = new ObjectContainer("NewUser","Välkommen");

						ObjectHeadline = new CreateHeadline("Välkommen");

						ObjectWelcomeText = new CreateParagraph("Det här är ParaFlow");

						ObjectNewUser.addObject(ObjectHeadline.getElement);

						ObjectNewUser.addObject(ObjectWelcomeText.getElement);
						
						
					} else {
						console.debug("ett fel uppstod när du försökte skapa gruppen, kontrollera att gruppen inte redan är skapad annars vänligen kontakta admin")
					}
				},"json");
			}
			event.preventDefault;
			return false;
		});		
				
		function placeSubmitButton(lable) {
			submitButton.attr({ value:lable });
			form.append(submitButton);
		}
		
		function addTextarea(newTextarea) {
			inputArray.push(newTextarea);
//			form.prepend(inputArray[inputArray.length-1]getElement);
			
//			this.textarea = newTextarea; //borde input läggas i en variabel?
			form.append(newTextarea.getElement);
		}
		
		function addInput(newInput,container) {
			inputArray.push(newInput);
			newInput.getInput().keyup(function () {
				setTimeout(function() { validate(newInput); }, 1000);
			});
			newInput.getInput().focusout(function () {
				 validate(newInput);
			});
			
			if (container=="left")
				leftContainer.append(newInput.getElement);
			else if (container=="right")
				rightContainer.append(newInput.getElement);
			else
				form.append(newInput.getElement);	
		}
		
		function activateLeftRightContainer() {
			inputContainer = $("<div/>").addClass("inputContainer");
			leftContainer = $("<div/>").addClass("left");
			rightContainer = $("<div/>").addClass("right");
			inputContainer.append(leftContainer,rightContainer);
			form.append(inputContainer);
		}
		
		function addRegisterPasswordInput(passwordInput) {
//			passwordInput.getInputP1().keyup(function () {
//				setTimeout(function() { validate(passwordInput) }, 000);
//			});
			form.append(passwordInput.getElement);
			inputArray.push(passwordInput);			
		}
		
		function addSelect(select) {
			inputArray.push(select);			
			form.append(select.getElement());
		}		
		
		function addInputAndDoNameCheck(newInput,container) {
			inputArray.push(newInput);
			
			newInput.getInput().keyup(function () {
				setTimeout(function() { nameCheck(newInput); }, 1000);
			});

			if (container=="left")
				leftContainer.append(newInput.getElement);
			else if (container=="right")
				rightContainer.append(newInput.getElement);
			else
				form.append(newInput.getElement);
		}
		
		function addLineBreake(container) {
			if (container=="left")
				leftContainer.append($("<div/>").addClass("lineBreak"));
			else if (container=="right")
				rightContainer.append($("<div/>").addClass("lineBreak"));
			else
				form.append($("<div/>").addClass("lineBreak"));
		}
		
		function validate(validationObject) {
			var check = validationObject.getRegexp();
	        var value = validationObject.getValue(); //lägger in värdet i en variabel
	        var passed = false;
	        
	        console.debug(validationObject,check,value);
	        
	        if (check) { //Om check inte är false ska en validering ske
	        	if (check=="password") { //Specialvalidering för dubbel pass.
	        		if (validationObject.getLength()<6) {
						validationObject.setDeniedP1();
						validationObject.setMessageP1("Ditt lösenord måste innehålla minst 6 bokstäver");
						return false;
	        		} else if (!validationObject.getMatch()) {
						validationObject.setDeniedP2();
						validationObject.setAcceptedP1();
						validationObject.setMessageP1("");
						validationObject.setMessageP2("Dina lösenord stämmer inte överens med varandra");
						return false;
	        		} else {
						validationObject.setMessageP1("");
						validationObject.setMessageP2("");
						validationObject.setAcceptedP1();
						validationObject.setAcceptedP2();
						return true;
	        		}
	        	} else if (value) { //om det finns ett värde
	    	        var minLength = validationObject.getMinLength();
	    	        console.debug(minLength)
	        		if(value.length>=minLength){
						if (check(value)) { //Kontrollerar värdet mot medskickade regexp
							validationObject.setAccepted();
							validationObject.setMessage("");
							return true;
						} else {
							submitButton.css({ 'background-color':disabledButtonBackgroundColor,'border':'solid 2px '+disabledButtonBorderColor,'color':disabledButtonTextColor, 'cursor':'auto' });
							validationObject.setDenied();
							validationObject.setMessage(" Felaktig inmatning");
							return false;
						}
	        		} else {
	        			validationObject.setDenied();
						validationObject.setMessage("");
						return false;
	        		}
	        	} else { //Om det inte finns ett värde och en validering behövde gå igenom, retunera false.
					validationObject.setMessage("Obligatoriskt");	        		
	        		return false;
	        	}
	        } else { //Inget värde som behöver valideras
	        	return true;
	        }			
		}
		
		function nameCheck(nameCheckObject) { //Kontrollerar om namnet finns i databasen.
			var nameCheckObject = nameCheckObject;
			if (validate(nameCheckObject)) {
				$.post("controller/get_page.php?func=checkIf"+nameCheckObject.getName()+"Exist", { 'name':nameCheckObject.getValue() }, function(returnedName){
					if (returnedName) {
						submitButton.attr("disabled", "true");						
						nameCheckObject.getInput().css({'border':'solid 2px '+veriationBorderColorDenied });
						submitButton.css({ 'background-color':disabledButtonBackgroundColor,'border':'solid 2px '+disabledButtonBorderColor,'color':disabledButtonTextColor, 'cursor':'auto' });
						nameCheckObject.setMessage(" Namnet finns redan");
					} else {
						nameCheckObject.getInput().css({'border':'solid 2px '+veriationBorderColorAccepted });
						nameCheckObject.setMessage("");
						submitButton.css({'background-color':activeButtonBackgroundColor,'border':'solid 2px '+activeButtonBorderColor,'color':activeButtonTextColor,'cursor':'pointer' });
						submitButton.removeAttr('disabled');
					}
				});
			}
		}
		
		return { 
			getForm : form,
			addInput : addInput,
			addTextarea : addTextarea,
			addSelect : addSelect,
			addLineBreake : addLineBreake,
			addInputAndDoNameCheck : addInputAndDoNameCheck,
			addRegisterPasswordInput : addRegisterPasswordInput,
			activateLeftRightContainer : activateLeftRightContainer,
			placeSubmitButton : placeSubmitButton
		};
	}
	
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //       Textarea        //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateTextarea(name,description) {
		this.name=name;
		this.description = description;
		
		if (this.description==undefined) {
			var label = $("<label/>").attr({ 'for':this.name+"Name", style:'display:none' }).text(this.name);
		} else { 
			var label = $("<label/>").attr({ 'for':this.name+"Name" }).text(this.description);
		}
		
		var dl = $("<dl/>");
		var dt = $("<dt/>");
		
		var dd = $("<dd/>");
		var textarea = $("<textarea/>").attr({ name:this.name+"Text", id:this.name+"Text" }).addClass("textFlow");
		var span = $("<span/>").text("").addClass("denialMessage"); //Medelande kopplat till validering
		
		dt.append(label);
		dd.append(textarea,span);
		
		dl.append(dt,dd);
		
		function getInput(){
			return input;
		}
		
		function setValue(value){
			textarea.value(value);
		}
		
		function getValue(){
			return $(textarea).val();
		}
		
		function getRegexp(){ //Ingen validering på text. kan ev sätta så att det minst måste vara ett visst antal tecken.
			return false;
		}		
		
		function setValue(value) { //För att kunna sätta ett värde
			$(textarea).val(value);
		}
		
		function resetElement() {
			$(textarea).val("");
			span.text("");
		}
		
		function getElement() {
			return dl;
		}
		
		function setMessage(message) {
			span.text(message);
		}
		
		return {
			getValue : getValue,
//			getName : getName,
			getRegexp : getRegexp,
			getElement : getElement,
			setValue : setValue,
			setValue : setValue,
			setMessage : setMessage,
			resetElement : resetElement
			
		};
	}

	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //    Radio Button       //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateRadioButtons(elementName,headline,styleClass,regexpCheck,minLength) {
		var styleClass = styleClass;
		var buttonArrays = new Array();
		var selectionContainer = $("<div/>").addClass(styleClass);
		var ul = $("<ul/>");
		var headline = $("<h2>").text(headline)
		var infoMessage = $("<span/>").text("").addClass("informationMessage"); //Medelande kopplat till validering

		selectionContainer.append(ul);
		selectionContainer.prepend(headline,infoMessage);
		
		function addButton(name,text) {
			this.name = name;
			this.text = text?text:"";
			buttonArrays.push($("<li/>"));
			
			var radio = $("<input/>").attr({ type:"radio", value:buttonArrays.length, name:elementName }).click( function() {
				for (i=0;i<=buttonArrays.length-1;i++) {
					$(buttonArrays[i]).children("label").attr({ style:"background:#B9DCFF" });
				}				
				$(this).parent().attr({ style:"background:#56b0ff" });
			});
			var label = $("<label/>").text(name).addClass("radioLabel");
			var span = $("<div/>").text(this.text).addClass("radioButtonText");
			label.append(radio);
			buttonArrays[buttonArrays.length-1].append(label,span);
			ul.append(buttonArrays[buttonArrays.length-1]);
		}
		
		
		function getMinLength() {
			return minLength;
		}

		function setMessage(message) {
			infoMessage.text(message);
		}
		
		function setAccepted(){
			selectionContainer.css({'border':'solid 2px '+veriationBorderColorAccepted });
		}		
		
		function setDenied() {
			selectionContainer.css({'border':'solid 2px '+veriationBorderColorDenied });
		}
		
		function getValue() {
			return selectionContainer.find(":checked").val();
		}
	
		function setValue(){ //behövs denna?
			selectionContainer.find(":checked").attr('checked', false);
		}
		
		function getName(){
			return selectionContainer.find(":checked").attr("name");
		}
		
		function resetElement() {
			selectionContainer.find(":checked").attr('checked', false);
			selectionContainer.css({'border':'none' });
		}
		
		function getElement() {
			return selectionContainer;
		}
		
		function getRegexp(){
			return regexpCheck;
		}
		
		return {
			getRegexp : getRegexp,
			addButton : addButton,
			setMessage : setMessage,
			setAccepted : setAccepted,
			setDenied : setDenied,
			getValue : getValue,
			getMinLength : getMinLength,
			getName : getName,
			setValue : setValue,
			getElement : getElement,
			resetElement : resetElement
		};
	}
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //   Event Selection List  //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateEventSelection(name) {
		var select = $("<select/>");

		$.post("controller/get_page.php?func=getEventList", { 'group':"group" }, function(eventList){ 
			$(eventList).each(function (i) {
				var option = $("<option/>").attr({ value:eventList[i].id }).text(eventList[i].name);
				select.append(option);				
			});
		},"json");

		function getElement() {
			return select;
		}
		
		return {
			getElement : getElement
		};
	}
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //     Create Input      //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateInput(name,description,regCheck,minLength) {
//		var regcheck=regcheck;
		this.name=name;
		this.description=description;
		
		var dl = $("<dl/>");
		var dt = $("<dt/>");
		if (this.description==undefined) {
			var label = $("<label/>").attr({ 'for':this.name, style:'display:none' }).text(this.name);
		} else { 
			var label = $("<label/>").attr({ 'for':this.name }).text(this.description);
		}
		
		var dd = $("<dd/>");
		var input = $("<input/>").attr({ name:this.name, id:this.name, type:"text" });
		var span = $("<span/>").text("").addClass("denialMessage");
		
		dt.append(label);
		dd.append(input,span);
		
		dl.append(dt,dd);
		
		function setAccepted(){
			input.css({'border':'solid 2px '+veriationBorderColorAccepted });
		}		
		
		function setDenied() {
			input.css({'border':'solid 2px '+veriationBorderColorDenied });
		}
		
		function getMinLength() {
			return minLength;
		}
		
		function getRegexp(){
			return regCheck;
		} 
		
		function getInput(){
			return input;
		}
		
		function getName(){
			return input.attr("name");
		}
		
		function getValue(){
			return $(input).val();
		}
		
		function setValue(value) {
			$(input).val(value);
		}
		
		function getElement() {
			return dl;
		}
		
		function setMessage(message) {
			span.text(message);
		}
		
		function resetElement() {
			$(input).val("");
			input.css({'border':'solid 2px '+ordeneryBorderColor });
			span.text("");
		}
		
		return {
			getValue : getValue,
			getName : getName,
			getInput : getInput,
			getRegexp : getRegexp,
			setValue : setValue,
			setMessage : setMessage,
			setAccepted : setAccepted,
			getMinLength : getMinLength,
			setDenied : setDenied,
			getElement : getElement,
			resetElement : resetElement
		};
	}
	
	  //≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	 //   Create Password Input      //
	//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈//
	
	function CreateRegisterPasswordInput(name,description,description2) {
		var regcheck=regcheck;
		
		var dl = $("<dl/>");
		var dt = $("<dt/>");
		var labelP1 = $("<label/>").attr({ 'for':"password1" }).text(description);

		var dd = $("<dd/>");
		var inputP1 = $("<input/>").attr({ name:"password1", id:"password1", type:"password" });
		var spanP1 = $("<span/>").text("").addClass("denialMessage");
		
		dt.append(labelP1);
		dd.append(inputP1,spanP1);
		
		dl.append(dt,dd);
		
		var dt = $("<dt/>");
		var labelP2 = $("<label/>").attr({ 'for':"password2" }).text(description2);
		
		var dd = $("<dd/>");
		var inputP2 = $("<input/>").attr({ name:"password2", id:"password2", type:"password" });
		var spanP2 = $("<span/>").text("").addClass("denialMessage");
		
		dt.append(labelP2);
		dd.append(inputP2,spanP2);
		
		dl.append(dt,dd);
					
		function getRegexp(){
			return "password";
		} 
		
//		function getInputP1(){
//			return inputP1;
//		}
//		
//		function getInputP2(){
//			return inputP2;
//		}
		
		function setAcceptedP1(){
			inputP1.css({'border':'solid 2px '+veriationBorderColorAccepted });
		}		
		
		function setDeniedP1() {
			inputP1.css({'border':'solid 2px '+veriationBorderColorDenied });
		}	
		
		function setAcceptedP2(){
			inputP2.css({'border':'solid 2px '+veriationBorderColorAccepted });
		}		
		
		function setDeniedP2() {
			inputP2.css({'border':'solid 2px '+veriationBorderColorDenied });
		}	
//		function getName(){
//			return input.attr("name");
//		}
		
		function getLength(){
//			console.debug($(inputP1).val().length)//$(inputP1).val());
			return $(inputP1).val().length;
		}
		
		function getMatch(){
//			console.debug("getMatch P1",inputP1.val(),"GetMatch P2",inputP2.val())//$(inputP1).val());
			if (inputP1.val()==inputP2.val()) 
				return true;
			else
				return false;
		}
		
		function getValue() {
			return "password";
		}
		
		function getElement() {
			return dl;
		}
		
		function setMessageP1(message) {
			spanP1.text(message);
		}
		
		function setMessageP2(message) {
			spanP2.text(message);
		}
		
		return {
			setAcceptedP1 : setAcceptedP1,
			setAcceptedP2 : setAcceptedP2,		
			setDeniedP1 : setDeniedP1,
			setDeniedP2 : setDeniedP2,	
			getLength : getLength,
			getMatch : getMatch,
			getRegexp : getRegexp,
			getValue : getValue,
			setMessageP1 : setMessageP1,
			setMessageP2 : setMessageP2,
			getElement : getElement
		};
	}	
	
	function ViewFlows() {
		
		function setEvent() {
			
		}
		
		function getFlows() {
			
		}
		
		return {
			setEvent : setEvent,
			getFlows : getFlows
		};
	}
	
	function ViewEvents() {
		
		function setGroup() {
			
		}
		
		function getEvents() {
			
		}
		
		return {
			setGroup : setGroup,
			getEvents : getEvents
		};
	}
	
	function ViewGroups() {
		var container = $("<div/>");
		var ul = $("<ul/>");
		
		function getGroups(getGroupFunction) {
			var getGroupFunction = "getAllPublicGroups";
			
			$.post("controller/get_page.php?func="+getGroupFunction,{ 'user_id':'user' }, function(data){
				$(data).each(function (i) {
					
					var link = $("<a/>").attr({ href }) 
//					var li = $("<li/>").text(data[i]['name']);
					
					var li = $("<li/>").append($('<a href="?get='+data[i].id+'">'+data[i].name+'</a>'));

					
					ul.append(li);
					console.debug(data[i]['id'],data[i]['name']);
					
				});
			},"json");
			container.append(ul);
			return container;
		}
		
		return {
			getGroups : getGroups
		};
	}

	function ViewProfile() {
		
		function setProfile() {
			
		}
	
		function getProfile() {
			
		}
		
		return {
			setProfile : setProfile,
			getProfile : getProfile
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
						if (ObjectFlow==undefined) {
							ObjectFlow = new ObjectContainer("Flow","Skapa nytt Flow");
							var NewFlowForm = new CreateForm(ObjectFlow.getName);//är get name nödvädig?

							var RadioButton = new CreateRadioButtons("flowSecurity","","securityContainer");
							RadioButton.addButton("Dold","");
							RadioButton.addButton("Sluten","");
							RadioButton.addButton("Öppen","");
							NewFlowForm.addSelect(RadioButton);
							
							var NewFlowInput = new CreateTextarea(ObjectFlow.getName);//är get name nödvädig?
							NewFlowForm.addTextarea(NewFlowInput);
							
							var EventList = new CreateEventSelection(ObjectFlow.getName);//är get name nödvädig?
							
							NewFlowForm.addSelect(EventList);

							NewFlowForm.placeSubmitButton("Skicka Flow");

							ObjectFlow.addObject(NewFlowForm.getForm);

							$("#mainContainer").append(ObjectFlow.getObject);
							ObjectFlow.moveToTop();

						} else {
							ObjectFlow.moveToTop();
							ObjectFlow.setShow();
						}
					} else if (data=="event") { //*** Event ***
						if (ObjectEvent==undefined) {
							ObjectEvent = new ObjectContainer("Event","Skapa nytt Event");
							var NewEventForm = new CreateForm(ObjectEvent.getName);
							var NewEventInput = new CreateInput("eventName","Namn",titleRegexp,"2");
							
							var EventList = new CreateEventSelection(ObjectEvent.getName);

							NewEventForm.addInputAndDoNameCheck(NewEventInput);
							NewEventForm.addLineBreake();

							var RadioButton = new CreateRadioButtons("membershipRules","Medlemsregler","radioContainer",digitRegexp,"1");
							RadioButton.addButton("Dold","Endast inbjudna medlemmar kan läsa och skriva.");
							RadioButton.addButton("Sluten","Endast godkända medlemmar kan skriva och diskutera, övriga medlemmar kan läsa publicerat material.");
							RadioButton.addButton("Öppen","Alla kan ansluta och delta i diskussionen av vad som skall publiceras.");
							NewEventForm.addSelect(RadioButton);	
							NewEventForm.addLineBreake();
							
							NewEventForm.placeSubmitButton("Skapa Event");
							NewEventForm.addLineBreake();

//							NewEventForm.addSelect(EventList);
//							NewEventForm.addLineBreake();
							
							ObjectEvent.addObject(NewEventForm.getForm);

							$("#mainContainer").append(ObjectEvent.getObject);
							ObjectEvent.moveToTop();

						} else {
							ObjectEvent.moveToTop();
							ObjectEvent.setShow();
						}
					} else if (data=="profile") { //*** Profile ***
						if (profile===undefined) {
							profile = new ObjectContainer("Profile","Profil");
							
						} else {
							profile.moveToTop();
							profile.setShow();
						}

					} else if (data=="groups") { //*** Groups ***
						if (ObjectGroup==undefined) {
							ObjectGroup = new ObjectContainer("Group","Skapa ny Grupp");
							var NewGroupForm = new CreateForm(ObjectGroup.getName);
							var NewGroupInput = new CreateInput("groupName","Namn",titleRegexp,"2");
							NewGroupForm.addInputAndDoNameCheck(NewGroupInput);
							NewGroupForm.addLineBreake();

							var NewGroupDescription = new CreateTextarea("groupDescription","Beskrivning av grupp");
							NewGroupForm.addTextarea(NewGroupDescription);
							NewGroupForm.addLineBreake();
							
							var RadioButton = new CreateRadioButtons("administratorRules","Administratörregler","radioContainer",digitRegexp,"1");
							RadioButton.addButton("Strikt","Endast skapern väljer administratörer.");
							RadioButton.addButton("Hedrande","En användare uppnår administratör status när denna är tillräckligt aktiv.");
							RadioButton.addButton("Flödesbaserat","Vem som helt har möjlighet att arbeta med publiceringen men efter varje redigering eller publicering måste åtgärden godkännas av en aktiv medlem.");
							NewGroupForm.addSelect(RadioButton);
							NewGroupForm.addLineBreake();
							
							var RadioButton = new CreateRadioButtons("membershipRules","Medlemsregler","radioContainer",digitRegexp,"1");
							RadioButton.addButton("Dold","Endast inbjudna medlemmar kan läsa och skriva.");
							RadioButton.addButton("Sluten","Endast godkända medlemmar kan skriva och diskutera, övriga medlemmar kan läsa publicerat material.");
							RadioButton.addButton("Öppen","Alla kan ansluta och delta i diskussionen av vad som skall publiceras.");
							NewGroupForm.addSelect(RadioButton);
							NewGroupForm.addLineBreake();
													
							NewGroupForm.placeSubmitButton();

							ObjectGroup.addObject(NewGroupForm.getForm);

							$("#mainContainer").prepend(ObjectGroup.getObject);
						} else {
							ObjectGroup.moveToTop();
							ObjectGroup.setShow();
						}

							
					} else if (data="register") {
						if (ObjectRegister==undefined) {
						
							ObjectRegister = new ObjectContainer("register","Registrera ny användare");
							var NewRegisterForm = new CreateForm(ObjectRegister.getName);

							NewRegisterForm.activateLeftRightContainer();
							
							var NewRegisterFirstNameInput = new CreateInput("firstName","Förnamn",nameRegexp);
							NewRegisterForm.addInput(NewRegisterFirstNameInput,"left");
							var NewRegisterLastNameInput = new CreateInput("lastName","Efternamn",nameRegexp);
							NewRegisterForm.addInput(NewRegisterLastNameInput,"right");
							NewRegisterForm.addLineBreake("left");
							NewRegisterForm.addLineBreake("right");
							var NewRegisterAliasInput = new CreateInput("alias","Användarnamn",titleRegexp);
							NewRegisterForm.addInputAndDoNameCheck(NewRegisterAliasInput,"left");

							var NewRegisterEMailInput = new CreateInput("email","E-Post",emailRegexp);//emailRegexp
							NewRegisterForm.addInputAndDoNameCheck(NewRegisterEMailInput,"right"); //Felaktig inmatning här tills man skrivit i helt rätt mail.

							NewRegisterForm.addLineBreake();
							var NewRegisterPasswordInput = new CreateRegisterPasswordInput("Password","Lösenord","Upprepa lösenordet");
							NewRegisterForm.addRegisterPasswordInput(NewRegisterPasswordInput);
							
							
							NewRegisterForm.addLineBreake();
							
							
							NewRegisterForm.placeSubmitButton("Regristrera");

							
							ObjectRegister.addObject(NewRegisterForm.getForm);

							$("#mainContainer").prepend(ObjectRegister.getObject);
						} else {
							ObjectRegister.moveToTop();
							ObjectRegister.setShow();
						}
//						if ($("#register").length != 0) {	
//							$("#register").css({ opacity:"1", display:"block" });
//						} else {
//
//							var close = closeButton();
//							
//							var register = $("<div/>").attr('id','register').addClass("mainContainerObject");
//							var headline = $("<h1/>").text("Regristrering");
//							var dl = $("<dl/>");
//							
//							var container = $("<div/>").addClass("container"); 
//							var footer = $("<div/>").addClass("footer"); 
//							var leftDiv = $("<div/>").addClass("left");
//							var rightDiv = $("<div/>").addClass("right");
//							var form = $("<form/>").attr({ action:'controller/form_handler.php',method:'post'});
//							
//							//Vänstra fältet
//							createInput("first_name","Förnamn",true).appendTo(dl);
//							createInput("last_name","Efternamn",true).appendTo(dl);
//							createInput("email","E-Post",true).appendTo(dl);
//							createInput("password","Lösenord",true).appendTo(dl);
//							createInput("password2","Upprepa lösenordet",true).appendTo(dl);
//							dl.appendTo(leftDiv);
//							
//							//Högra fältet
//							var dl = $("<dl/>");
//							createInput("alias","Användarnamn",true).appendTo(dl);	
//							createInput("skype","Skype",false).appendTo(dl);
//							createInput("country","Land",false).appendTo(dl);
//							createInput("city","Stad",false).appendTo(dl);
//							
//							var dt = $( "<dt/>" );
//							var label = $( "<label>" ).attr({"for": "birthdate"}).text("Födelsedatum");
//							var dd = $( "<dd/>" );
//							
//							var input = $( "<input/>" ).attr({ name: 'birthdate', id:"birthdate" });
//							input.datepicker({
//								changeYear: true,
//								changeMonth: true,
//								dateFormat: "yy-mm-dd",
//								maxDate: "+1Y",
//								yearRange: '1900:2011',
//								firstDay: 1
//
//							});
//						    input.keyup(function() { validate($(this));});
//						    input.change(function() { validate($(this));});
//							input.appendTo( dd );			    
//						    optimalImage = $("<img/>").attr({ 						 
//								src: imgurl+"optionalFiled.png",
//								title: "Optional Field",
//								id: 'birthdateChecked',
//								alt: "Optional Field" }).addClass("optionalField");
//						    optimalImage.appendTo(dd);
//							label.appendTo( dt );
//
//							dd.appendTo( dt );
//											
//							dt.appendTo(dl);		
//							
//							dl.appendTo(rightDiv);
//							var hidden = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'register' });
//
//							var submitButton = $("<input/>").attr({ type:'Submit', id:'submitRegisterFormButton', value:'Regristrera' }).click(function(){
//								validation=true;
//								$("#register input").each(function (i){						
//									if (!validate($(this))) {
//										validation=false;
//									}
//								});					
//								if (!validation) {
//									return false;
//								} else {
//									console.debug("true");
//								}
//							});
//							
//							footer.append(submitButton,hidden);
//							
//							container.append(leftDiv,rightDiv,footer);
//							container.appendTo(form);
//							form.appendTo(register);
//							
//							register.prepend(close,headline);
//
//						}
//						$("#mainContainer").prepend(register);
						
						
					}
				});
				event.preventDefault();
				return false;
			});
			
		});
		
	}, "json");

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
	

});