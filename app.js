let prompt = document.querySelector(".prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let apiUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDQBDrSk8uuRaMZWLmwfvMX9Se0GDJH6GA";
// creating tht chatbox function 3
function createChatBox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}
async function getApiResponse(aiChatBox) {
  let textElement = aiChatBox.querySelector(".text");
  try {
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
    });
    let data = await response.json();
    let apiResponse = data?.candidates[0].content.parts[0].text;
    textElement.innerText = apiResponse;
    console.log(apiResponse);
  } catch (e) {
    console.log(e);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}
function showLoading() {
  let html = ` <div id="img">
        <img src="https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=1380" >
    </div>
    <div class="text">
    </div>
     <img class="loading" src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif"  alt="loading" height="50px">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getApiResponse(aiChatBox);
}

// getting the text by click on the user -- 2
btn.addEventListener("click", function () {
  userMessage = prompt.value;
  //   console.log(userMessage);
  if ((prompt.value = "")) {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
  if (!userMessage) return;
  // create the chat box
  let html = ` <div id="img">
        <img src="https://cdnl.iconscout.com/lottie/premium/thumb/young-user-profile-5273095-4424672.gif" >
    </div>
    <div class="text">
    </div>`;

  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 1000);
});
