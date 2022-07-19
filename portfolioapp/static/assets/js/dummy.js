// setUserResponse==> display usermessage
// send==> api hitting


function init() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    //--------------------------- Chatbot Frontend -------------------------------//
    //----------------------------------------------------------------------------//

    const chatContainer = document.getElementById("chat-container");

    template = `<button class="chat-btn"><img src = "https://bit.ly/3HsmMuF" class='icon'></button>

    <div class='chat-popup' style="z-index: 999;">
    
    <div class='chat-header'>
        <div class='chatbot-img'>
            <img src='${header_img}' alt='Chat Bot image' class='bot-img'> 
        </div>
        
        <h3 class='bot-title'>Covid Bot</h3>
       
        <button class = "expand-chat-window" ><img src="https://bit.ly/3tDygpJ" class="icon" ></button>
    </div>
    
    <div class='chat-area' id='message-box' >
  
        <div class='main-area' id='main_content' style="display: none;">
            <div class='bot-msg' id="msg" style="display: none;">
                <img class='bot-img' src='${botLogoPath}' />
                <span class='msg'>Hi, How can i help you?</span>
            </div>
  
  
        </div>
  
    </div>
  
  
  
  
    <div class='chat-input-area'>
   
  
        <input type='text' autofocus class='chat-input' id='input' name='input'
            onkeypress='return givenUserInput(event)' placeholder='Type a message ...' autocomplete='off'
            onclick="inp()" />
       
        <button class='chat-submit' id='submit1' onkeypress='return givenUserInput(event)'><i
                class='material-icons'>send</i></button>
  
    </div>
  
  </div>`


    chatContainer.innerHTML = template;

    //--------------------------- Important Variables----------------------------//
    //---------------------------------------------------------------------------//
    var inactiveMessage = "Server is down, Please contact the developer to activate it"


    chatPopup = document.querySelector(".chat-popup")
    chatBtn = document.querySelector(".chat-btn")
    chatSubmit = document.querySelector("#submit1")
    chatHeader = document.querySelector(".chat-header")
    language = document.querySelector("#myImage1")
    bounce1 = document.querySelector("#botTyping");
    mic_btn = document.querySelector("#myImage")
    menuChips = document.querySelector(".menuChips")
    send_btn = document.querySelector("#submit1")
    chatArea = document.querySelector(".main-area")
    dis_btn = document.querySelector("#message")

    chatInput = document.querySelector(".chat-input")
    expandWindow = document.querySelector(".expand-chat-window")
    root = document.documentElement;
    chatPopup.style.display = "none"
    var host = ""


    //======================= ChatBot Toggler==================================//
    //=========================================================================//

    chatBtn.addEventListener("click", () => {
        $("#hindi1").prop("checked", false);
        $("#english1").prop("checked", true);
        $("#tamil1").prop("checked", false);

        $("#tamil").prop("disabled", false);
        $("#english").prop("disabled", true);
        $("#hindi").prop("disabled", false);
        mobileDevice = !detectMob()
        if (chatPopup.style.display == "none" && mobileDevice) {
            chatPopup.style.display = "flex"
            chatInput.focus();
            chatBtn.innerHTML = `<img src = "https://bit.ly/3tDf4IK" class = "icon" >`
        } else if (mobileDevice) {
            chatPopup.style.display = "none"
            chatBtn.innerHTML = `<img src = "https://bit.ly/3HsmMuF" class = "icon" >`
        } else {
            mobileView()
        }
    })

    chatSubmit.addEventListener("click", () => {
        let userResponse = chatInput.value.trim();
        if (userResponse !== "") {
            setUserResponse(userResponse);
            send(userResponse)
        }
    })

    expandWindow.addEventListener("click", (e) => {
        // console.log(expandWindow.innerHTML)
        if (expandWindow.innerHTML == '<img src="https://bit.ly/3tDygpJ" class="icon">') {
            expandWindow.innerHTML = `<img src = "https://bit.ly/3Oh7oDQ" class = 'icon'>`
            root.style.setProperty('--chat-window-height', 80 + "%");
            root.style.setProperty('--chat-window-total-width', 85 + "%");
        } else if (expandWindow.innerHTML == '<img src="https://bit.ly/3tDf4IK" class="icon">') {
            chatPopup.style.display = "none"
            chatBtn.style.display = "block"
        } else {
            expandWindow.innerHTML = `<img src = "https://bit.ly/3tDygpJ" class = "icon" >`
            root.style.setProperty('--chat-window-height', 500 + "px");
            root.style.setProperty('--chat-window-total-width', 380 + "px");
        }

    })
}

//=======================================================RESPONSES===================================================================//
//===================================================================================================================================//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// to submit user input when he presses enter
function givenUserInput(e) {
    if (e.keyCode == 13) {
        let userResponse = chatInput.value.trim();
        if (userResponse !== "") {
            setUserResponse(userResponse)
            send(userResponse)
        }
    }
}


// to display user message on UI
function setUserResponse(msg) {
    let temp = `<div class="user-msg"><span class = "msg">${msg}</span></div>`
    chatArea.innerHTML += temp;
    chatInput.value = ""

    document.getElementById("main_content").style.display = "block";
    scrollToBottomOfResults();
    chatInput.focus();
    showBotTyping();

}

var passwordInput = false;

function userResponseBtn(e) {
    send(e.value);
}

function showresponse(result) {
    hideBotTyping();
    var BotResponse = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><span class='msg'>${result}</span></div>`;
    $(BotResponse).appendTo('.main-area').hide().fadeIn(1000);
    scrollToBottomOfResults();

}

function showresponsebutton(result) {

    hideBotTyping();
    var div = document.createElement("div");

    div.innerHTML = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><span class='chat-message-received' id="MenuChips"> ${result} </span></div>`;
    div.className = "chat-message-div-button";
    document.getElementById("main_content").appendChild(div);
    document.getElementById("main_content").scrollTop = document.getElementById(
        "main_content"
    );
    scrollToBottomOfResults();
    chatInput.focus();
    running = false;
}

//================================================ API HIT ===========================================================//
//====================================================================================================================//

var user_id = getRandomInt(1, 999999);
function send(message) {
    console.log("User Message:", message)

    fetch(host, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin' ,
       
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"sender": user_id, "message": message})

    }).then(response => {
        response.text().then(res => {

            var responsefromrasa = JSON.parse(res);

            // console.log(responsefromrasa)
            // var array = JSON.parse("[" + responsefromrasa + "]");

            var val = responsefromrasa
            console.log(val)

            setTimeout(function () {
                hideBotTyping();
                if (val.length < 1) {
                    msg = inactiveMessage;
                    var BotResponse = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><span class='msg'> ${msg} </span></div>`;
                    $(BotResponse).appendTo('.main-area').hide().fadeIn(1000);
                }
                else {
                    //if we get response from Rasa
                    for (i = 0; i < val.length; i++) {
                        //check if there is text message
                        if (val[i].hasOwnProperty("text")) {
                            const botMsg = val[i].text;
                            if (botMsg.includes("password")) {
                                chatInput.type = "password";
                                passwordInput = true;
                            }
                            var BotResponse = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><span class='msg'>${val[i].text}</span></div>`;
                            $(BotResponse).appendTo('.main-area').hide().fadeIn(1000);

                        }

                        //check if there are buttons
                        if (val[i].hasOwnProperty("buttons")) {
                            addSuggestion(val[i].buttons);
                        }

                       
                    }
                    scrollToBottomOfResults();
                    chatInput.disabled = false;
                    chatInput.focus();
                }

            }, 500);

        }).catch(error => {
            setUserResponse(inactiveMessage);
            console.log('Error' + inactiveMessage);
            hideBotTyping()
        });

    });
    chatInput.focus();
}


//======================================bot typing animation ======================================//
//=================================================================================================//


function showBotTyping() {

    var botTyping = '<div class="" id="botTyping">' + '<div class="">typing ....</div>' + '</div>'
    showresponsebutton(botTyping);
    scrollToBottomOfResults();
    chatInput.focus();
}

function hideBotTyping() {

    $('.chat-message-div-button').remove();
    $('.botTyping').remove();
}

function scrollToBottomOfResults() {
    chatArea.scrollTop = chatArea.scrollHeight;
}



function addSuggestion(textToAdd) {

    setTimeout(function () {
        var suggestions = textToAdd;
        var suggLength = textToAdd.length;

        var button = ""

        //$(' <div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></diV>').appendTo("main_content").hide().fadeIn(1000);
        ////console.log("Value: ", textToAdd)
        for (i = 0; i < suggLength; i++) {
            idx = "button_" + suggestions[i].payload
            //$('<div class="menuChips" data-payload=\'' + (suggestions[i].payload) + '\'>' + suggestions[i].title + "</div>").appendTo("main_content");
            button += "<button class='menuChips' id=\"" + (suggestions[i].payload) + "\">" + suggestions[i].title + "</button>";

        }
        showresponsebutton(button);

        // var div = document.createElement("div");


    }, 1000);
}

$(document).on("click", ".menuChips", function () {

    var text = this.innerText;
    var payload = this.getAttribute('id');
    console.log("text: ", text);
    console.log("payload: ", this.getAttribute('id'));
    setUserResponse(text);

    send(payload);
    //delete the suggestions once user click on it
    $(".menuChips").remove();
    $(".chat-message-div-button").remove();

    showBotTyping();


});


//============================================ CREATECHATBOT and THEMES =====================================================//
//===========================================================================================================================//

function createChatBot(hostURL, Tamil_URL, Eng_URL, Hin_URL, enrollment_URL, verification_URL, botLogo, header_img, title, welcomeMessage, inactiveMsg, theme = "blue", menu1_title, menu2_title, menu3_title, menu4_title, menu5_title, menu6_title,
menu1_title_img, menu2_title_img, menu3_title_img, menu4_title_img, menu5_title_img, menu6_title_img

) {
    header_img = header_img
    enrollment_URL = enrollment_URL
    verification_URL = verification_URL
    host = hostURL;
    Tamil_URL = Tamil_URL
    Eng_URL = Eng_URL
    Hin_URL = Hin_URL
    botLogoPath = botLogo;
    inactiveMessage = inactiveMsg;
    menu1_title=menu1_title
    menu2_title=menu2_title
    menu3_title=menu3_title
    menu4_title=menu4_title
    menu5_title=menu5_title
    menu6_title=menu6_title
    menu1_title_img=menu1_title_img
    menu2_title_img=menu2_title_img
    menu3_title_img=menu3_title_img
    menu4_title_img=menu4_title_img
    menu5_title_img=menu5_title_img
    menu6_title_img=menu6_title_img


    init()
    const msg = document.querySelector(".msg");
    msg.innerText = welcomeMessage;

    const botTitle = document.querySelector(".bot-title");
    botTitle.innerText = title;

    chatbotTheme(theme)
}


function mobileView() {
    $('.chat-popup').width($(window).width());

    if (chatPopup.style.display == "none") {
        chatPopup.style.display = "flex"
        // chatInput.focus();
        chatBtn.style.display = "none"
        chatPopup.style.bottom = "0"
        chatPopup.style.right = "0"
        chatPopup.style.height = "100%"
        // chatPopup.style.transition = "none"
        expandWindow.innerHTML = `<img src = "https://bit.ly/3tDf4IK" class = "icon" >`
    }
}

function detectMob() {
    return ((window.innerHeight <= 800) && (window.innerWidth <= 600));
}

function chatbotTheme(theme) {
    const gradientHeader = document.querySelector(".chat-header");
    const orange = {
        color: "#FBAB7E",
        background: "linear-gradient(19deg, #FBAB7E 0%, #F7CE68 100%)"
    }

    const purple = {
        color: "#B721FF",
        background: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)"
    }

    const red = {
        color: "#ff1e2a",
        background: "linear-gradient(19deg, rgb(255 0 0) 0%, rgb(165 181 47) 100%)"
    }

    const blue2 = {
        color: "#2611a9",
        background: "linear-gradient(19deg, rgb(18 215 102) 0%, rgb(138 181 199) 100%)"
    }
    const green = {
        color: "#73cd76",
        background: "linear-gradient(160deg, #83e07f 0%, #5cb8ae 100%)"
    }

    const black = {
        color: "black",
        background: "linear-gradient(177deg, rgb(6 6 6) 0%, rgb(183, 33, 255) 100%)"
    }




    if (theme === "orange") {
        root.style.setProperty('--chat-window-color-theme', orange.color);
        gradientHeader.style.backgroundImage = orange.background;
        myImage1.style.backgroundImage = orange.background;
        mic_btn.style.backgroundImage = orange.background;
        send_btn.style.backgroundImage = orange.background;
        bounce1.style.backgroundImage = orange.background;

    } else if (theme === "purple") {
        root.style.setProperty('--chat-window-color-theme', purple.color);
        gradientHeader.style.backgroundImage = purple.background;
        myImage1.style.backgroundImage = purple.background;
        mic_btn.style.backgroundImage = purple.background;
        send_btn.style.backgroundImage = purple.background;

    }
    else if (theme === "red") {
        root.style.setProperty('--chat-window-color-theme', red.color);
        gradientHeader.style.backgroundImage = red.background;
        myImage1.style.backgroundImage = red.background;
        mic_btn.style.backgroundImage = red.background;
        send_btn.style.backgroundImage = red.background;
    }

    else if (theme === "blue2") {
        root.style.setProperty('--chat-window-color-theme', blue2.color);
        gradientHeader.style.backgroundImage = blue2.background;
        myImage1.style.backgroundImage = blue2.background;
        mic_btn.style.backgroundImage = blue2.background;
        send_btn.style.backgroundImage = blue2.background;
    }

    else if (theme === "green") {
        root.style.setProperty('--chat-window-color-theme', green.color);
        gradientHeader.style.backgroundImage = green.background;
        myImage1.style.backgroundImage = green.background;
        mic_btn.style.backgroundImage = green.background;
        send_btn.style.backgroundImage = green.background;
    }

    else if (theme === "black") {
        root.style.setProperty('--chat-window-color-theme', black.color);
        gradientHeader.style.backgroundImage = black.background;
        myImage1.style.backgroundImage = black.background;
        mic_btn.style.backgroundImage = black.background;
        send_btn.style.backgroundImage = black.background;
    }


}


/****************************************************JS END **********************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/








