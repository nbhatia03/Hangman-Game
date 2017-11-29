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

console.log(pickWord(words));
populate(currentWord);

document.onkeydown = function(event){
    var guess = event.key;
    console.log(guess)
};

