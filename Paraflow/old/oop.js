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
	
	//KLASSER
	function ObjectContainer(objectName) {
		var objectName = objectName;
		var container = $("<div/>").text("Objekt: "+objectName);
		
		function addObject(objekt) {
			container.append(objekt);
		}
		
		return {
			getObject : container,
			addObject : addObject,
			getName : objectName
		};
	}
	
	function CreateForm(name) {
		var name = name;
		var form = $("<form/>");
		var submitButton = $("<input/>").attr({ type:'submit', value:"Skapa "+name });
		
		var input;
		
		submitButton.click(function(event){
			if (validate(input.getValue())) {
				$.post("controller/form_handler_ajax.php?func=create"+name, { 'name':input.getValue() }, function(data){
//					data kan inehålla id om man vill.
				});
				input.setValue("");
			} else {
//				console.debug(input.getValue(),input.getInput());
				console.debug("validering ej ok");
			}
			event.preventDefault;
			return false;
		});		
		
		form.append(submitButton);
		
		function addInput(newInput) {
			input = newInput;
			input.getInput().keyup(function () { //<<<----------
				validate(this);
			});
			form.prepend(input.getElement);
		}
		
		function addInputAndDoNameCheck(newInput) {
			input = newInput;
			input.getInput().keyup(function () { //<<<----------
				nameCheck(input);
			});
			form.prepend(input.getElement);
		}
		
		function validate(value) {
//			console.debug("validerar:",$(obj).val());
	        var check = /^([A-Za-z\Å\Ä\Ö\å\ä\ö\-\_\*\^\.\,]{1,40} {0,1}){1,10}$/; //Namn regler
	        var value = value; //lägger in värdet i en variabel
	        var passed = false;
	        
	        if (value.length>2) {
				if (check(value)) { 
					return true;
				} else {
					return false;
				}
	        } else {
	        	return false;
	        }			
		}
		
		function nameCheck(obj) {
			var object = obj;
			
			if (validate(object.getValue())) {
				$.post("controller/get_page.php?func=checkIf"+name+"Exist", { 'name':object.getValue() }, function(returnedName){
					if (returnedName) {
						submitButton.attr("disabled", "true");						
						object.getInput().css({'border':'solid 2px '+veriationBorderColorDenied });
						object.setMessage(" Namnet finns redan");
					} else {
						object.getInput().css({'border':'solid 2px '+veriationBorderColorAccepted });
						object.setMessage("");
						submitButton.removeAttr('disabled');
					}
				});
			}
		}
		
		
		return { 
			getForm : form,
			addInput : addInput,
			addInputAndDoNameCheck : addInputAndDoNameCheck
		};
	}
	
	function GetSelectList() {
		
		function getOptions() {
			
			
			
		}
		
	}
	
	function CreateInput(name) {
		this.name=name;
		
		var dl = $("<dl/>");
		var dt = $("<dt/>");
		var label = $("<label/>").attr({ 'for':this.name+"Name", style:'display:none' }).text(this.name);
		
		var dd = $("<dd/>");
		var input = $("<input/>").attr({ name:this.name+"Name", id:this.name+"Name" });
		var span = $("<span/>").text("hej")
		
		dt.append(label);
		dd.append(input,span);
		
		dl.append(dt,dd);
		
		function getInput(){
			return input;
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
		
		return {
			getValue : getValue,
			getInput : getInput,
			setValue : setValue,
			setMessage : setMessage,
			getElement : getElement
		};
	}

	//SKAPANDET AV NYA OBJEKT
	
	//GROUP
	var ObjectGroup = new ObjectContainer("Group");
	var NewGroupForm = new CreateForm(ObjectGroup.getName);
	var NewGroupInput = new CreateInput(ObjectGroup.getName);
	
	NewGroupForm.addInput(NewGroupInput);
	
	ObjectGroup.addObject(NewGroupForm.getForm);
	
	//EVENT
	var ObjectEvent = new ObjectContainer("Event");
	var NewEventForm = new CreateForm(ObjectEvent.getName);
	var NewEventInput = new CreateInput(ObjectEvent.getName);
	
	NewEventForm.addInputAndDoNameCheck(NewEventInput);
	
	ObjectEvent.addObject(NewEventForm.getForm);

	$("#container").append(ObjectGroup.getObject,ObjectEvent.getObject);
	
	
	

});