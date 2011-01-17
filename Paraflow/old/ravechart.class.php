<?php
class RaveChart{
	
	private $id, $type, $profile, $city;
	
	
	
	function __construct($id = null ,$attr = null){
		$this->id = $id;
		if ($id) {
			$query = "SELECT * FROM ravechart WHERE id {$id} LIMIT 1";
			$result = mysql_query($query);
			$ravechart = mysql_fetch_assoc($result);
			$this->profile = $ravechart['profile'];
			$this->type = $ravechart['type'];
			$this->city = $ravechart['city'];
		}
		
		if ($attr['type'])
			$this->type = $attr['type'];
			
		if ($attr['profile'])
			$this->profile = $attr['profile'];
			
		if ($attr['city'])
			$this->city = $attr['city'];
		
	}
 	
	
	function __destruct(){
		if($this->id) {
				
			$query = "
				UPDATE ravechart
				SET 
					type = '{$this->type}',
					profile = '{$this->profile}',
					city = '{$this->city}'
				WHERE id = {$this->id}
			";

		} else {
		
			$query = "
				INSERT INTO ravechart
				(type, personality, city)
				VALUES ('{$this->type}','{$this->personality}','{$this->city}')
			";
	}
	mysql_query($query);
	
}
// json_encode($objektet);



class Person{
	
	private $name, $phone, $age;

	function __construct($name = null,$phone = null){ //gör det frivilligt att skicka in name
		
//		$this->name = ($name) ? $name:null; //om name inehåller något stoppar vi in $name, annars $name=null
		$this->setName($name);
		$this->setPhone($phone);
		
	}
	
	function __destruct(){
		echo "<p>Bye bye! ({$this->getName()})</p>";
	}
	
	
	function sayHelloTo($person){
		echo "Hello".$person->getName()." my name is ".$this->getName();
		
//		$person->sayHelloTo
	}
	
	
	function getName(){
		return $this->name;
		
	}
	
	function setName($name){
		$this->name = $name;
		
	}

	function getPhone(){
		return $this->phone;
		
	}
	
	function setPhone($phone){
		$this->phone = $phone;
		
	}
}
//class RaveChart {
//	private $type, $profile;
//	
//	function __construct($profile) {
//		$this->profile = $profile;
//	}
//	
//	function personality() { //En funktion i en class kallas för en meto.
//		echo "My type is".$this->profile;
//	}	
//}