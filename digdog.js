const NUM_BONES = 6;
let minBones = NUM_BONES;
let maxBones = NUM_BONES * 2;
let randomMeter = Math.floor(Math.random() * (maxBones - minBones + 1))+ minBones;
let widthDanger = NUM_BONES * NUM_BONES * 10;
let meterIncrease = widthDanger / randomMeter;
let count = 0;
let bonesCount = NUM_BONES;

$(document).ready(function() {

    for( let numRowsCreated = 0; numRowsCreated < NUM_BONES; numRowsCreated++ )
    {
        for(let numColumnsCreated = 0; numColumnsCreated < NUM_BONES; numColumnsCreated++)
        {
            createSquare();
        }
        let breakTag = $("<br>");
        $("div#board").append(breakTag);
    }

    // while number of surprises successfully hidden < number of bones
    for (let numBonesHidden = 0; numBonesHidden < NUM_BONES; numBonesHidden++) {

        // pick a random number between NUM_BONES and NUM_BONES * 2
        let randomNumber = Math.floor(Math.random() * (NUM_BONES * NUM_BONES));

        // pick a random square
        let randomSquare = $("div.square").eq(randomNumber);

        let count = 0;
        // if the square does not already have a bone
        if (!randomSquare.hasClass("foundBone")) {
            // hide a bone
            randomSquare.addClass("foundBone");
            count++;
        }
    }

    createRectangle();
    $("#bonesCount").text(bonesCount);
});
//Creating the Danger meter
function createRectangle()
{
    let greenTab = $("div#green");
    greenTab.width(widthDanger);
    greenTab.css("background-color", "green");
}
//Updating the danger meter based on click
function dangerMeter (widthIncrease)
{
    let rectangle = $("div#red");
    rectangle.width(widthIncrease);
    rectangle.css("background-color", "red");
}

function playerGuess() {
    // find what square was clicked exactly
    let clickedSquare = $(this);

    if(count < randomMeter)
    {
        count++;
        let widthIncrease = meterIncrease * count;
        dangerMeter(widthIncrease);

        let isSurprise = clickedSquare.hasClass("foundBone");

        if (isSurprise === true) {
            clickedSquare.css({"background-color": "brown","background-image":" url(\"bone.png\")"});
            bonesCount--;
            $("#bonesCount").text(bonesCount);
            clickedSquare.off("click");
        }
        else {
            clickedSquare.css("background-color", "brown");
            clickedSquare.off("click");
        }
    }
    else if(bonesCount === 0)
        {
            $("p#dog").text("Woo Hoo, You found all the bones");
        }
        else
        {
            $("p#dog").text("Bad dog, get off my lawn!!");
        }
    }

function createSquare()
{
    let board = $("div#board");
    let square = $("<div></div>");
    let boxes = 10;
    square.height(NUM_BONES*boxes);
    square.width(NUM_BONES*boxes);
    square.addClass("square");
    square.css("background-color", "green");
    square.click(playerGuess);
    board.append(square);
}
