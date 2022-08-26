let color = '#3aa757';
let repeat = 5;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ repeat })
  console.log('Default background color set to %cgreen', `color: ${color}`)
})