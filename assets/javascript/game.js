var words = ['tumbleweed', 'horse', 'gallows', 'prospector', 'ranching', 'campfire', 'drought', 'saloon', 'cholera', 'dysentery', 'measels', 'noose'],
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
var changeGif = function(guesses){

}



//show correct word and game over when guesses = 0
var gameOver = function(){
    completedWord();
    if(isComplete){
        $('#game-over').text("YOU WIN!")
        wins ++
    }else{
        $('#game-over').text('Game over');
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
        return true
    }
    else{
        return false
    }
}

var winner = function(){
    completedWord()
    if(isComplete){
        $('#game-over').text("YOU WIN!")
        wins ++
    }
}

var reset = function(){
    guesses = 15;
    lettersGuessed = [];
    currentWord = '';
    liArray = [];
    isComplete = false;
    pickWord(words);
    populate(currentWord);
    $('#guesses-left').text(guesses);
}

//game starts here
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


//show correct word and game over when guesses < 0
//show congrats when word is complete
//play victory music
//keep track of wins

//use this for cowboy talking later
// var showText = function (target, message, index, interval) {    
//     if (index < message.length) { 
//       $(target).append(message[index++]); 
//       setTimeout(function () { showText(target, message, index, interval); }, interval); 
//     } 
//   }
      
//   $(function () { 
   
//     showText("#msg", "Hello, World!", 0, 200);    
   
//   }); 