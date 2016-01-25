var left = 37;
var up = 38;
var right = 39;
var down = 40;
var enter = 13;

function Game(boardElement) {
    this.score = 0;
    this.flipNumber = 0;
    this.slot = 16;
    this.Index = 0;
    this.boardElement = boardElement;
    this.cards = [];
    this.onHold = [];

    window.addEventListener("keydown", this.OnKeyDown.bind(this), false);
}

Game.prototype.begin = function() {
    //create card swap them score 0 blablabla

    this.distribute();

}

Game.prototype.update = function() {

}

Game.prototype.end = function() {
    //game over write your score blablabla

}

Game.prototype.distribute = function() {

    var colours = [];
    for (var i = 0; i < 8; ++i) {
        colours[i] = i + 1;
    }
    colours = shuffleArray(colours);

    for (var i = 0; i < (this.slot / 2); ++i) {
        this.cards[i] = new Card(colours[i], this.boardElement);
    }

    colours = shuffleArray(colours);

    for (var i = 8; i < (this.slot); ++i) {
        j = i - 8;
        this.cards[i] = new Card(colours[j], this.boardElement);
    }

    this.cards[this.Index].focus();
}


Game.prototype.resetscore = function() {
    //game over write your score blablabla
    this.score = 0;
    this.flipNumber = 0;
    this.slot = 16;
}

Game.prototype.getIndex = function() {
    return this.Index;
}

Game.prototype.setIndex = function(index) {
    this.Index = index;
}




Game.prototype.OnKeyDown = function(e) {


    var index = this.getIndex();

    switch (e.keyCode) {
        case left: //left
            {

                this.cards[this.Index].unfocus();
                index--;
                if (index < 0)
                    index = 0;

                this.setIndex(index);
                this.cards[this.Index].focus();
                break;
            }

        case up: //up
            {
                this.cards[this.Index].unfocus();
                index = index - 4;
                if (index < 0)
                    index = 0;

                this.setIndex(index);
                this.cards[this.Index].focus();
                break;
            }
        case right: //right
            {
                this.cards[this.Index].unfocus();
                index++;
                if (index > 15)
                    index = 15;

                this.setIndex(index);
                this.cards[this.Index].focus();
                break;
            }
        case down: //down
            {
                this.cards[this.Index].unfocus();
                index = index + 4;
                if (index > 15)
                    index = 15;
                this.setIndex(index);
                this.cards[this.Index].focus();
                break;
            }
        case enter: //enter  
            {
                if (this.onHold[0] != this.Index && this.cards[this.Index].isPaired() == false) {
                    this.cards[this.Index].flip();
                    this.onHold.push(this.Index);
                    if (this.onHold.length > 1) {
                        if (this.cards[this.Index].colour == this.cards[this.onHold[0]].colour) {
                            this.score++;
                            this.cards[this.Index].setPair();
                            this.cards[this.onHold[0]].setPair();
                            this.onHold.length = 0;
                            this.slot -= 2;

                        } else {
                        setTimeout( this.cards[this.Index].unflip.bind(this.cards[this.Index]), 1000);
                        setTimeout(  this.cards[this.onHold[0]].unflip.bind(this.cards[this.onHold[0]]), 1000);
                            this.score--;
                            this.onHold.length = 0;
                        }
                        this.flipNumber++;
                        document.getElementById("scorebox").textContent = this.score;
                        document.getElementById("stepbox").textContent = this.flipNumber;
                    }
                }
                if (this.slot <= 0) {

                    document.getElementById('scorefield').value= this.score; 
                    document.getElementById('stepfield').value= this.flipNumber; 
                    form_pop();
                    
                }
                //alert("congratulation! your score is "+ this.score + " done in "+ this.flipNumber + " number of steps!");
                break;
            }
    }

}
function form_pop() {
node = document.getElementById("form-box");
 
node.style.visibility = "visible";
     
}

function Card(colour, parent) {
    this.colour = 'colour' + colour;
    this.pair = false;

    this.element = document.createElement('div');
    this.element.className = "card backcard";


    document.getElementById("wrapper").appendChild(this.element);

}

Card.prototype.focus = function() {
    // manipulate this.element
    //this.element.classList.remove('focused');

    this.element.className += " focused";
}


Card.prototype.unfocus = function() {
    // manipulate this.element
    this.element.classList.remove('focused');
}

Card.prototype.flip = function() {
    // manipulate this.element
    this.element.classList.remove('backcard');
    this.element.className += ' ' + this.colour;
    //this.onHold.push()
}


Card.prototype.unflip = function() {
    // manipulate this.element
    this.element.classList.remove(this.colour);
    this.element.className += " backcard";
}

Card.prototype.isPaired = function() {
    return this.pair;
}

Card.prototype.setPair = function() {
    this.pair = true;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

