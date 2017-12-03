var words = ['tumbleweed', 'horse', 'gallows', 'prospector', 'ranching', 'campfire', 'drought', 'saloon', 'cholera', 'dysentery', 'measles', 'noose'],
    guesses = 15,
    wins = 0,
    lettersGuessed = [],
    currentWord = '',
    liArray = [],
    isComplete = false;

//pick random word
var pickWord = function(wordList){
    var ind = Math.floor(Math.random()*wordList.length);
    currentWord = wordList[ind];
    return currentWord;
}


//make blanks for the word
var populate = function(word){
    console.log(word.length)
    for(var i = 0; i < word.length; i++){
        $("#word").append("<li id='letter" + i + "'>_</li>");

    }
}

//see if the letter is correct
var compareLetter = function(letter){
    //check if letter has been guessed
    if(lettersGuessed.indexOf(letter) != -1){
        alert("Guess another letter!")
    }
    //compare letter to selected word
    else{
        for (var i=0; i<currentWord.length; i++){
            //if letter is in the word, show it in DOM
            if(letter === currentWord[i]){
                $("li:nth-child(" + (i+1) + ")").text(letter);
            }
        }
        //update DOM and array with newly guessed letter
        $('#lettersGuessed').append("<b>" + letter + "</br>");
        lettersGuessed.push(letter);
        guesses --;
        $('#guesses-left').text(guesses);
    }
}

//make sure that the keypress was a letter
var checkLetter = function(uniCode, letter){
    if (uniCode >= 65 && uniCode <= 90) {
        compareLetter(letter);
    }
    else{
        alert("Guess a letter!")
    }
}

//change cowboy gif
var chooseGif = function(){
    if(guesses < 6){
        $('#cowboy-gif').attr("src", "assets/images/Crying.gif")
    }else if(guesses < 11){
        $('#cowboy-gif').attr("src", "assets/images/Tugging-Noose.gif")
    }
}

var changeGif;
//*setting var equal to setInterval caused reset function to mess up*


//show correct word and game over when guesses = 0
var gameOver = function(){
    completedWord();
    clearInterval(cowboySpeech);
    clearInterval(changeGif);
    $('#reset-btn').removeClass("invisible");
    if(isComplete){
        // $('#game-over').text("YOU WIN!")
        wins ++
        $('#wins').text(wins)
    }else{
        // $('#game-over').text('Game over');
        for(var i=0; i < currentWord.length; i++){
            //Don't fully understand why this works
            (function (i) {
                setTimeout(function () {
                    $('#letter' + i).text(currentWord[i].toUpperCase());  //This part changes letter, other parts deal with delay
            }, 1000*i)})(i);
        } 
    } 
}

//see if entire word has been guessed correclty
var completedWord = function(){
    liArray = []
    //make array of what has been guessed correctly
    for (var i = 0; i < currentWord.length; i++){
        liArray.push($('#letter' + i).text());
    }
    //check if the word is complete
    isComplete = liArray.every(complete);
}

//used to check if the word is finished
var complete = function(letter){
    if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122){
        return true;
    }
    else{
        return false;
    }
}

//see if the player has won
var winner = function(){
    completedWord();
    if(isComplete){
        // $('#game-over').text("YOU WIN!");
        wins ++;
        clearInterval(cowboySpeech);
        clearInterval(changeGif);
        $('#msg').text("You've saved me!");
        $('#reset-btn').removeClass("invisible");
        $('#wins').text(wins)
    }
}

//COWBOY SPEECH -----------------------------------------
var cowboyPhrases =[],
cowboyPhrases1 =["Please help me!", "Can't wait to get out of here.", "I'm innocent, you've gotta help me!"],
cowboyPhrases2 =["This noose is pretty snug...", "Need you to try just a little harder.", "I'm feeling a little dizzy..."],
cowboyPhrases3 =["Oh God, I have so many regrets", "Please, I have a family!", "Please God, not like this!", "The end is near...", "I should've married Sharon when I had the chance", "If you don't get this word right, you're essentially murdering me", "I will blame you for my death"],
index = 0,
message = '',
interval = 12000;

var showText = function () { 
    if (index < message.length) { 
      $('#msg').append(message[index++]); 
      setTimeout(function () { showText(message, index); }, 150); 
    } 
  }
      
   
// showText("Hello, World!", 0);
var chooseMessage = function(){
    if(guesses > 11){
        cowboyPhrases = cowboyPhrases1;
    }else if (guesses < 6){
        cowboyPhrases = cowboyPhrases3;
    }else{
        cowboyPhrases = cowboyPhrases2
    }
    var ind = Math.floor(Math.random()*cowboyPhrases.length);
    message = cowboyPhrases[ind];
}


var cowboySpeaking = function(){
    $('#msg').text('');
    chooseMessage();
    index = 0;
    showText();
}

var cowboySpeech;
//setting var equal to setInterval caused reset function to mess up

//------------------------------------------------

//reset the game
var reset = function(){
    $('#word').text('');
    $('#lettersGuessed').text('')
    guesses = 15;
    lettersGuessed = [];
    currentWord = '';
    liArray = [];
    isComplete = false;
    pickWord(words);
    populate(currentWord);
    $('#guesses-left').text(guesses);
    $('#reset-btn').addClass("invisible");
    $('#cowboy-gif').attr("src", "assets/images/Normal.gif")

    //Start intervals
    cowboySpeech = setInterval(cowboySpeaking, interval);
    changeGif = setInterval(chooseGif, 7000);
    
}

//GAME STARTS HERE -------------------------------------------------
reset();

document.onkeyup = function(event){
    var guess = event.key;
    var uniCode = event.keyCode;
    //if word isn't complete, game is playable
    if(!isComplete){
        checkLetter(uniCode, guess);
        winner();
        if(guesses === 0){
            gameOver();  
        }
    }
};


//Overlay GAME OVER or YOU WIN on screen
//show congrats when word is complete
//play victory music
//keep track of wins
