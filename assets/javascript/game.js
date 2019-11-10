$(document).ready(function() {
    var characters = {
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/jedi_obi_wan_by_katzai.jpg",
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
    var renderOne = function(character, renderArea){
        var charDiv = $("<div class= 'character' data-name='"+ character.name +"'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src",character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }
    var renderCharacters = function(charObj, areaRender){
        if(areaRender === "#characters-section"){
            $(areaRender).empty();
            for (var key in charObj){
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender);
                }
            }
        }
    }
    renderCharacters(characters, "characters-section");
});

