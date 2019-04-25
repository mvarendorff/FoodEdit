// ==UserScript==
// @name         Waffles
// @namespace    https://github.com/geisterfurz007
// @version      0.3
// @description  Make your last message to waffles!
// @author       geisterfurz007
// @match        https://chat.stackoverflow.com/rooms/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    if (typeof GM !== 'object') {
		GM = {};
	}

	if (typeof GM_xmlhttpRequest === 'function' && !GM.xmlHttpRequest) {
		GM.xmlHttpRequest = GM_xmlhttpRequest;
	}

    const buttonsContainer = $("#chat-buttons");
    const waffleButton = $("<a>");
    waffleButton.attr("id", "waffle-button").addClass("button").text("Foodify last message").css({
        "position": "relative",
        "background-color": "#C60030"
    });

    buttonsContainer.append(waffleButton);
    
    waffleButton.click(editLastMessage);

    function editLastMessage() {
        const ingredientsJson = "https://raw.githubusercontent.com/geisterfurz007/FoodEdit/master/ingredients.json";
        
        $.getJSON(ingredientsJson, function(json) {
            const data = json.data;
            data.push("waffles"); //Has to be in there!
            const index = Math.floor(Math.random() * data.length);
            const ingredient = data[index];
            const cleanedIngredient = ingredient.toLowerCase().replace(" ", "-");
            const fkey = $("#fkey").attr("value");
            const messageElement = $(".monologue.mine").last().find(".message:last");
            const messageId = messageElement.attr("id").split("-")[1];

            const requestSettings = {
                "method": "POST",
                "url": "https://" + window.location.host + "/messages/" + messageId,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "fkey": fkey,
                    "text": "[tag:" + cleanedIngredient + "]"
                }
            }

            $.ajax(requestSettings)

        });
    }

})();