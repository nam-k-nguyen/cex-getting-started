// ---------
// VARIABLES
// ---------

// Elements from the popup miniscreen
let repeat = document.getElementById('repeat');
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let start = document.getElementById('start');
let stop = document.getElementById('stop');

// Regular expression for related pages
const INDIVIDUAL_RANK_REGEX = /https:\/\/webapps2.uc.edu\/elce\/Student\/Position\/Rank.*/g
const MULTIPLE_RANK_REGEX = /https:\/\/webapps2.uc.edu\/elce\/Student\/Position\/ViewRank.*/g

// Limit for the number of ranking repeat
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 30;


document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.sync.get("repeat_number", ({ repeat_number }) => {
    repeat.innerText = repeat_number;
  })
})

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
// When the body is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (str_match_reg(tab.url, individual_rank_regex)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: navigate_rank,
    });
  } else if (str_match_reg(tab.url, multiple_rank_regex)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: navigate_view_rank,
    });
  }

});

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });


// Content script for debugging
function debug() {
  chrome.storage.sync.get("debug_text", ({ debug_text }) => {
    console.log(`%c ${debug_text} `, 'background: #555; color: #bada55');
  })
}

// Content script in view rank page
function navigate_view_rank() {
  console.log("inside navigate_view_rank fn")

  let firstButton = document.querySelector('td>a.btn.btn-danger')
  firstButton.click();

  chrome.storage.sync.get("repeat", ({ repeat }) => {
    console.log(repeat)
  })
}

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