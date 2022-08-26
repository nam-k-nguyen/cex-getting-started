let changeColor = document.getElementById('changeColor');
let rankRepeat = document.querySelector('#rank-repeat');

const individual_rank_regex = /https:\/\/webapps2.uc.edu\/elce\/Student\/Position\/Rank.*/g
const multiple_rank_regex = /https:\/\/webapps2.uc.edu\/elce\/Student\/Position\/ViewRank.*/g


chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
})

// When the body is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
// Content script in rank page
function navigate_rank() {
  console.log("inside navigate_rank fn")

  let veryInterested = document.querySelector('.RadioButton>#PositionRankId_2');
  veryInterested.click();
  let saveButton = document.querySelector('button#saveButton');
  let cancelButton = document.querySelector('button[value=cancel]');
  cancelButton.click();
  // saveButton.click();
  chrome.storage.sync.get("repeat", ({ repeat }) => {
    console.log(repeat)
  })
}



// Function to match a String to a RegExp, returns true if match
function str_match_reg(str, reg) {
  if (typeof (str) !== 'string' || !reg instanceof RegExp) return false
  return str.match(reg) == str
}