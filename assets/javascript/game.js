var words = ['tumbleweed', 'horse', 'gallows', 'prospector', 'ranching', 'campfire', 'drought', 'saloon', 'cholera', 'dysentery', 'measels', 'noose'],
    guesses = 2,
    wins = 0,
    lettersGuessed = [],
    currentWord = '';


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
        $("#word").append("<li id='letter" + i + "'>____</li>");

    }
}

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




//show correct word and game over when guesses < 0
var gameOver = function(guessss){
    if(guessss === 0){
        $('#game-over').text('Game over');
        for(var i=0; i < currentWord.length; i++){
            $('#letter' + i).text(currentWord[i]);
        }
    }
}

//game starts here
console.log(pickWord(words));
populate(currentWord);
$('#guesses-left').text(guesses);

document.onkeyup = function(event){
    var guess = event.key;
    var uniCode = event.keyCode;
    console.log(guess)
    checkLetter(uniCode, guess);
    gameOver(guesses);  
};


//show correct word and game over when guesses < 0
//show congrats when word is complete
//play victory music
//keep track of wins