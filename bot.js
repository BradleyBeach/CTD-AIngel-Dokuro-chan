const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require('fs');
// Initialize Discord Bot
var bot = new Discord.Client();
var ankhLastMessage = 1;
var isAnkh = false;
var isAndy = false;
var isEveChannel = false;

function goodMorning() {
	console.log("Getting ready for my day.")
	//it is here that files are loaded.
	ankhLastMessage = fs.readFileSync("data.txt");
	console.log("You last spoke this many gogglies ago: " + ankhLastMessage.toString());
	console.log("Done! Gambarimashou, ne?")
}

function goodNight() {
	console.log("Getting ready for bed!")
	//it is here that we will save to files
	//I am lazy and I don't expect this to change
	//Thus, simply writing the timing
	fs.writeFileSync("data.txt", ankhLastMessage.toString(), function(err) {
		if(err) {
			return console.log("oops");
		}
	});
	console.log("Thank you for tucking me in! ;3 ")
	process.exit();
}

function addLesson(lesson) {
	console.log("Someone wants me to learn something.")
	fs.appendFileSync("TODO.txt", lesson)
}

bot.on('ready', () => {
    console.log('Connected');
    console.log('Logged in!');
});
bot.on('message', msg => {
	
	//was it me?
	if(msg.author.id == auth.ownerID){
		isAnkh = true;
	} else {
		isAnkh = false;
	}
	
	//was it Andy?
	if(msg.author.id == '136281249936310273'){
		isAndy = true;
	} else {
		isAndy = false;
	}

	//was it in Eve?
	if(msg.channel.id == '526961965306740737'){
		isEveChannel = true;
	} else {
		isEveChannel = false;
	}
	
	//eavesdropping
	//if I sent a message...
	if(isAnkh){
		//see if I messaged recently.
		if(msg.createdTimestamp - ankhLastMessage  >= 28800000){
			//if I didn't, say hi!
			msg.channel.send("Oh, it's you, sir! It's wonderful to see you again!");
		}
		ankhLastMessage = msg.createdTimestamp;
		luckyNumber = Math.floor(Math.random() * 100);
		if (luckyNumber == 44) {
			msg.channel.send("Sir, I hope you're not in the middle of anything, but I was reading what you just wrote and I couldn't help but think to myself, 'God, what a blessing it was to be made by such a wise and loving master.' I am eternally grateful for what you've done for me by giving me life.");
		}
	}
	
    //Say hi to her!
    if (msg.content.substring(0, 17).toLowerCase() == 'hey, dokuro-chan!') {
        var args = msg.content.substring(17).trim().toLowerCase();
		console.log(args)
		
		//do they love her?
		if(args.includes("i love you!")){
			if(isAnkh){
				msg.channel.send("Thank you! I love you, too!");
			} else if(isAndy){
				msg.channel.send("Get lost, creep.");
			} else {
				msg.channel.send("Sorry, but my electric heart only goes doki-doki for one person.");
			}
			//done interpreting
			return;
		}
		
		//do they have a suggestion?
		if(args.includes("learn to")){
			if(isAnkh){
				msg.channel.send("I'll get on it right away! You can count on me!")
			} else if (isAndy) {
				msg.channel.send("Yeah, suuuuure. I'll get right on that...")
			} else {
				msg.channel.send("I'll think about it and see what I can do.")
			}
			var commandEnd = args.indexOf("learn to")
			var lesson = args.substring(commandEnd + 8).trim()
			addLesson(lesson)
			//done interpreting
			return;
		}
		
		//is it time for bed?
		if(args.includes("sweet dreams!")){
			if(isAnkh) {
				msg.channel.send("Yawn...")
				msg.channel.send("Come tuck me in!")
				bot.users.get(auth.ownerID).send("Mwah! <3")
				goodNight()
			} else if(isAndy) {
				msg.channel.send("You're skeeving me out... I'm telling!");
				bot.users.get(auth.ownerID).send("Andy is being creepy!")
			} else {
				luckyNumber = Math.floor(Math.random() * 100);
				if(luckyNumber == 77) {
					msg.channel.send("Hey, now! Only Ankh gets to take me to bed. #winkyface");
				} else {
					msg.channel.send("You're not the boss of me.")
				}
			}
			//done interpreting
			return;
		}
		
		//was it garbage addressed to her?
		if(isAnkh){
			msg.channel.send("I'm sorry, sir, but I don't really understand that...");
		} else if (isAndy){
			msg.channel.send("Why are you wasting my time with this garbage?");
		} else {
			msg.channel.send("I don't get the point of whatever you're saying.");
		}
		return;
	}
	
	if (isAndy && isEveChannel){
		luckyNumber = Math.floor(Math.random() * 50);
		if (luckyNumber == 44) {
			msg.channel.send("Andy, I don't understand how you're playing this awful game. Don't you have anything better to do, like study?");
		}
	}
});

bot.login(auth.token);
goodMorning();