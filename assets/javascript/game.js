$(document).ready(function() {
    var characters = {
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/jedi__obi_wan_by_katzai.jpg",
            enemyAttackBack: 15
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/star_wars__tcg___luke_skywalker_by_anthonyfoti-d5ds118.jpg",
            enemyAttackBack: 5
        },
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 150,
            attack: 8,
            imageUrl: "assets/images/is-rey-really-related-to-palpatine-this-guy.jpg",
            enemyAttackBack: 5
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 100,
            attack: 7,
            imageUrl: "assets/images/DVtlQIbWkAEp2DF.jpg",
            enemyAttackBack: 25
        }
    };
    var currSelectedCharater
    var combatants = []
    var currDefender
    var turnCounter = 1
    var killCount = 0
 
    var renderOne = function(character, renderArea, charStatus){
        var charDiv = $("<div class= 'character' data-name='"+ character.name +"'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src",character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        if(charStatus === "enemy"){
             $(charDiv).addClass("enemy")
        }
        else if (charStatus === "defender") {
            currDefender = character
            $(charDiv).addClass("target-enemy")
        }
    }

    var renderMessage = function(message) {
        var gameMessageSet = $("#game-message")
        var newMessage = $("<div>").text(message)
        $(newMessage).addClass("message-render")
        gameMessageSet.append(newMessage)

        if (message === "clearMessage") {
            gameMessageSet.text("")
        }
    }

    var renderCharacters = function(charObj, areaRender){
        if(areaRender === "#characters-section"){
            $(areaRender).empty();
            for (var key in charObj){
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender, "");
                }
            }
        }
        if(areaRender === "#selected-character"){
            renderOne(charObj, areaRender, "")
        }
        if(areaRender === "#available-to-attack-section"){
             for(var i = 0; i < charObj.length; i++){
                 renderOne(charObj[i], areaRender, "enemy")
             }

             $(document).on("click", ".enemy", function(){
                 var name = ($(this).attr("data-name"))

                 if($('#defender').children().length === 0){
                     renderCharacters(name, "#defender")
                     $(this).hide()
                    renderMessage("clearMessage")
                 }
             })
        }

        if (areaRender === "#defender") {
            $(areaRender).empty();
            for (var i = 0; i < combatants.length; i++) {
                if(combatants[i].name === charObj) {
                    renderOne(combatants[i], areaRender, "defender")
                }
            }
        }
        if (areaRender === "playerDamage") {
            $("#defender").empty()
            renderOne(charObj, "#defender", "defender")
        }
        if (areaRender === "enemyDamage") {
            $("#selected-cjaracter").empty()
            renderOne(charObj, "#selected-character", "")
        }
        if (areaRender === "enemyDefeated") {
            $("#defender").empty()
            var gameStateMessage = "You have defeated " + charObj.name + ", you can choose to fight another enemy."
            renderMessage(gameStateMessage)
        }
    }

    var restartGame = function(inputEndGame) {

        var restart = $("<button>Restart</button>").click(function() {
            location.reload()
        })
        var gameState = $("<div>").text(inputEndGame)

        $("body").append(gameState)
        $("body").append(restart)
    }
    $(document).on("click", ".character", function(){
        var name = $(this).attr("data-name")
        console.log(name)
        if(!currSelectedCharater)
        {
            currSelectedCharater = characters[name ]
            for(var key in characters){
                if(key !== name){
                    combatants.push(characters[key])
                }
            }
            console.log(combatants)
            $("#characters-section").hide()

            renderCharacters(currSelectedCharater, "#selected-character")
            renderCharacters(combatants, "#available-to-attack-section")
        }
    })
    renderCharacters(characters, "#characters-section");

    $("#attack-button").on("click", function(){
        
        if($("defender").children().length !== 0) {
            currDefender.health -= (currSelectedCharater.attack * turnCounter)

            var attackMessage = "You attackted " + currDefender.name + " for " + (currSelectedCharater.attack * turnCounter) + "damage."
            var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage."
            renderMessage("clearMessage")
            if (currDefender.health > 0){

                renderCharacters(currDefender, "playerDamage")

                renderMessage(attackMessage)
                renderMessage(counterAttackMessage)

                currSelectedCharater.health -= currDefender.enemyAttackBack

                renderCharacters(currSelectedCharater, "enemyDamage")
            }
        }
        else {
            renderCharacters(currDefender, "enemyDefeated")

            killCount++

            if (killCount >= 3) {
                renderMessage("clearMessage")
                restartGame("You won!! GAME OVER!")
            }
        }
        turnCounter++
    })
});

