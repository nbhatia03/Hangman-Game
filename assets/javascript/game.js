var words = ['tumbleweed', 'horse', 'gallows'],
    guesses = 10,
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
        console.log(i)
        var node = document.createElement("LI");                 
        var textnode = document.createTextNode("_______");         
        node.appendChild(textnode); 
        document.getElementById("word").appendChild(node);
    }
}

var compareLetter = function(letter){
    //check if letter has been guessed
    if(lettersGuessed.indexOf(letter) != -1){
        console.log("Guess another letter!")
    }else{
        for (var i=0; i<currentWord.length; i++){
            if(letter === currentWord[i]){
                $("li:nth-child(" + (i+1) + ")").text(letter);
            }
        }
        $('#lettersGuessed').append("<b>" + letter + "</br>");
        lettersGuessed.push(letter);
        guesses --;
    }
}

console.log(pickWord(words));
populate(currentWord);

document.onkeydown = function(event){
    var guess = event.key;
    console.log(guess)
    compareLetter(guess);

    
};

