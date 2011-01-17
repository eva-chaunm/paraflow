$(function(){


var page = 1;
function ObjectContainer(objectName) {
	var container = $("</div>");
	
	function addContent(content) {
		console.debug("adding content to container",content);
		container.append(content);
	}
	
	function returnContainer() {
		return container;
	}
	
	
	return {
		addContent : addContent(content),
		returnContainer : returnContainer
	};
}

function Validate() {
	validate = "true";
	
	return{
		validate : validate
		
	}
}


function CreateForm() {	
	this.form = $("<form/>");
	
	var inputs = $("<div>");
		
	this.hiddenFunction = $("<input/>").attr({ type:'hidden', id:'_get_function', name:'_get_function', value:'create'+this.name });		
	this.submit = $("<input>");
	
	
	var validate = new Validation();

	this.submit.click(validate); //Validerar allt. (behövs denna?)
	
	function namecheck() {
		console.debug("namecheck");
		
	}
	
	function addInputToNameCheck(input) {
		input.keyup(namecheck());
		inputs.append(input);
	} 
	
	function addInput(input,validation){
		validation.addContent(input,validation);
		inputs.append(input);
	}
	
	return {
		addInput : addInput(input,validation),
		
		submitts : subbs
		
		
		
		
		
//	när körs validering
//	kontrollera valedingen om en namecheck.
//	valideringen ska köras på keyup.
//	valien känner av vad som läggs på. valideringen, valideringen känner av key press, valideringen känner av namecheck. valideringen.
	};
	
}

function Validation() {
	var objects = Array("object","validation");
	var validated = true;
	
	return {
		addObjectToCheck : function(setObj) {
			objects.push(setObj);
		},
		
		validateObject : function(obj) { //körs på key-press om önskat
			this.obj = obj;
		},
		
		validateAll : function() {
			$(objects).each(function (j) {		
				if (objects[j]['validation']=!"false") { //Validering måste ske				
					if (objects[j]["validation"](objects[j]['object'])) {
						passedValidation(objects[j]['object']);
					} else { //felaktig inmatning
		            	deniedValidation(objects[j]['object']);
		            	validated = false;
					} 
					
					//SPECIELLA UNDANTAG 
					//Om det är password2 så räcker det inte med att den passar kraven, den måste även överstämma med password1
	            	if (objects[j]['objectname']=="password2") {
	            		if (objects[password1]['object'].val() == objects[password2]['object'].val()) {
	            			//password 2 == godkänd
	            		} else {
	            			//password 2 stämmer inte överens med password 1
	            			validated = false;
	            		}
	            		
	            	}

				} else { //om validation == false, ingen validering behövs, grön och godkänd.
					passedValidation(objects[j]['object']);

				}
			});
			return validated;
			
			//Ska knappen vara avaktiverad så länge man gör en felaktig inmatning?
		}
	};
}



function CreateInput(name,validation) {
	this.name = name;
	var validation = validation;
	var value = "värde";

	function returnOnKeyup() { 
		
		return value;
		
	}	

	function returnValue() { 
		return value;
	}	
	
	this.returnValue = value;
	this.returnValidation = validation;
}

function selectList() {
	this.list = new selectListOptions("databasen = värde");
}

function selectListOptions(name) {
	var listObject = $("<select/>");
	
	return {
		setInputToCheck : function(obj) {
			listObject.append(content);
		},
		returnList : function() {
			return listObject;
		}
	
	};
}


if (page==1) {
	//name checks körs på önskad input, knappen stängs av om false.
	
	//validation körs för alla input när man trycker på knappen men även för varje medans man skriver i
	
	console.debug("1");
	var groupObject = new ObjectContainer("Group"); //skapar ett objekt att lägga saker i
	var groupForm = new CreateForm(); //Skapar ett formulär 
	
	//Lägger till validering
	var validation = new Validation(); //Validering ska alltid ske
	
	//Lägger till ett inputfält
	
	var groupNameInput = new CreateInput("/^[A-Za-z\Å\Ä\Ö\å\ä\ö]{2,40}");

} else if (page==2) {
	var eventObject = new objectContainer("Event");
	var eventForm = new createForm("Event");
	
	var newEventInput = new createInput("Event","namecheck");
	var newEventSubmit = new submitButton("Event");
	var newEventSelectlist = new selectList("Event");
	
	eventForm.addContent(newEventInput,newEventSelectlist,newEventSubmit);
	
	groupObject.addContent(groupForm);
} else if (page==3) {
	var flowObject = new objectContainer("Flow");
	var flowForm = new createForm("Flow");
	
	var newFlowInput = new createInput("Flow");
	var newFlowSubmit = new submitButton("Flow");
	var newFlowSelectlist = new selectList("Flow");
	
	flowForm.addContent(newFlowInput,newFlowSelectlist,newFlowSubmit);
	
	flowObject.addContent(flowForm);
}

});