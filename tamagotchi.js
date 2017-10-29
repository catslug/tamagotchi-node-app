var inquirer = require("inquirer");
var tamagotchiChoice

inquirer.prompt([
	{
		type: "list",
		message: "Which Tamagotchi would you like to play with?",
		choices: ["pup", "kitty"],
		name: "tamagotchi"
	}
	]).then(function(answers) {
		if (answers.tamagotchi === "pup") {
			tamagotchiChoice = "pup";
			playWithPup();
		} else {
			tamagotchiChoice = "kitty";
			playWithKitty();
		}
	})


function playWithPup() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do with pup?",
			choices: ["feed", "sleep", "play", "go outside", "go inside"],
			name: "command"
		}
	]).then(function(answers) {
		switch (answers.command) {
			case "feed": 
				pup.feed();
				break;
			case "sleep":
				pup.sleep();
				break;
			case "play":
				pup.play();
				break;
			case "go outside": 
				pup.goOutside();
				break;
			case "go inside":
				pup.goInside();
				break;
			default: 
				break;
		}
	})
}

function playWithKitty() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do with kitty?",
			choices: ["feed", "sleep", "play", "destroy furniture", "buy new furniture"],
			name: "command"
		}
	]).then(function(answers) {
		switch (answers.command) {
			case "feed": 
				kitty.feed();
				break;
			case "sleep":
				kitty.sleep();
				break;
			case "play":
				kitty.play();
				break;
			case "destroy furniture": 
				kitty.destroyFurniture();
				break;
			case "buy new furniture":
				kitty.buyNewFurniture();
				break;
			default: 
				break;
		}
	})
}

function DigitalPal(obj) {
	this.hungry = typeof obj.hungry !== "undefined" ? obj.hungry : false;
	this.sleepy = typeof obj.sleepy !== "undefined" ? obj.sleepy : false;
	this.bored = typeof obj.bored !== "undefined" ? obj.bored : true;
	this.age = typeof obj.age !== "undefined" ? obj.age : 0;
	this.feed = function() {
		if (this.hungry) {
			console.log("That was yummy!");
			this.hungry = false;
			this.sleepy = true;
		} else {
			console.log("No thanks! I'm full.");
		}
		var isTamagotchi = tamagotchiChoice === "pup" ? playWithPup() : playWithKitty();
	}
	this.sleep = function() {
		if (this.sleep) {
			console.log("Zzzzzzzz");
			this.sleepy = false;
			this.bored = true;
			this.increaseAge();
		} else {
			console.log("No way! I'm not tired.");
		}
		var isTamagotchi = tamagotchiChoice === "pup" ? playWithPup() : playWithKitty();
	}
	this.play = function() {
		if (this.bored) {
			console.log("Yay! Let's play.");
			this.bored = false;
			this.hungry = true;
		} else {
			console.log("Not right now. Maybe later?");
		}
		var isTamagotchi = tamagotchiChoice === "pup" ? playWithPup() : playWithKitty();
	}
	this.increaseAge = function() {
		this.age++;
		console.log("Happy Birthday to me! I am " + this.age + " age currencies old.")
	}
}

var pup = new DigitalPal({});
pup.outside = false,
pup.bark = function() {
	console.log("Woof woof!");
}
pup.goOutside = function() {
	if (!this.outside) {
		console.log("Yay! I love the outdoors!");
		this.outside = true;
		this.bark();
	} else {
		console.log("But we're already outside though...")
	}
	playWithPup();
}
pup.goInside = function() {
	if (this.outside) {
		console.log("Do we have to? Fine...");
		this.outside = false;
	} else {
		console.log("I'm already inside...");
	}
	playWithPup();
}

var kitty = new DigitalPal({});
kitty.houseCondition = 100;
kitty.meow = function() {
	console.log("Meow meow!");
};
kitty.destroyFurniture = function() {
	if (this.houseCondition > 0) {
		this.houseCondition = this.houseCondition - 10;
		console.log("MUAHAHAHAHA! TAKE THAT FURNITURE!");
		this.bored = false;
		this.sleepy = true;
	} else {
		console.log("You have no more house. Cats destroyed it.");
	}
	playWithKitty();
}
kitty.buyNewFurniture = function() {
	this.houseCondition = this.houseCondition + 50;
	console.log("Are you sure about that?");
	playWithKitty();
}