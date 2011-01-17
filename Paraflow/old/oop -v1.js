$(function(){
	
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
	
	function CreateForm() {
		var form = $("<form/>").text("Form")
		var submitButton = $("<input/>").attr({ type:'submit' });
		
		submitButton.click(function(event){
			console.debug(form.find("input").val()); //hur gör jag detta mer dynamiskt? .each om jag vill gå igenom fler fält.
			validate(form.find("input"));
			event.preventDefault;
			return false;
		});		
		
		form.append(submitButton);
		
		function addInput(input) {
			this.input = input;
			this.input.keyup(function () { //<<<----------
				console.debug("tryck",this);//this.find("input").val()
				validate(this);
			});
			form.prepend(this.input);
		}
		
		function addInputAndDoNameCheck(input) {
			this.input = input;
			this.input.keyup(function () { //<<<----------
				console.debug("tryck",this);//this.find("input").val()
				nameCheck(this);
			});
			form.prepend(this.input);
		}
		
		function validate(obj) {
			console.debug($(obj).val());
		}
		
		function nameCheck(obj) {
			console.debug("nameCheck:",$(obj).val());
			if ($(obj).val()=="aaa") {
				submitButton.attr("disabled", "true");
			} else {
				submitButton.removeAttr('disabled');
			}
		}
		
		
		return { 
			getForm : form,
			addInput : addInput,
			addInputAndDoNameCheck : addInputAndDoNameCheck
		};
	}
	
	function CreateInput(name) {
		this.name=name;
		var input = $("<input/>").attr({ name:this.name })
		
		return input;
	}

	//SKAPANDET AV NYA OBJEKT
	
	//GROUP
	var ObjectGroup = new ObjectContainer("Group");
	var NewGroupForm = new CreateForm();
	var NewGroupInput = new CreateInput(ObjectGroup.getName);
	
	NewGroupForm.addInput(NewGroupInput);
	
	ObjectGroup.addObject(NewGroupForm.getForm);
	
	//EVENT
	var ObjectEvent = new ObjectContainer("Event");
	var NewEventForm = new CreateForm();
	var NewEventInput = new CreateInput(ObjectEvent.getName);
	
	NewEventForm.addInputAndDoNameCheck(NewEventInput);
	
	ObjectEvent.addObject(NewEventForm.getForm);

	$("#container").append(ObjectGroup.getObject,ObjectEvent.getObject);

});