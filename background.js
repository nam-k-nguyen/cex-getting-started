let color = '#3aa757';
let repeat_number = 1;
let debug_text = 'none';
let is_automating = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ debug_text });
  chrome.storage.sync.set({ repeat_number });
  chrome.storage.sync.set({ is_automating });
})