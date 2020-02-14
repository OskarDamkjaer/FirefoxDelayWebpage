function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    settings: {
      color: document.querySelector("#color").value,
      textColor: document.querySelector("#textColor").value,
      time: parseInt(document.querySelector("#time").value, 10),
      text: document.querySelector("#text").value,
      fontSize: document.querySelector("#fontSize").value,
      runOn: document.querySelector("#runOn").value
    }
  });
  document.getElementById("savedSettings").style = "color:green;";
}

const defaultBlocks = String.raw`hckrnews\.com
reddit\.com
facebook\.com
news\.ycombinator\.com
youtube\.com`;

function restoreOptions() {
  function setCurrentChoice(result) {
    const settings = (result && result.settings) || {};
    document.querySelector("#color").value = settings.color || "#fff";
    document.querySelector("#textColor").value = settings.textColor || "#000";
    document.querySelector("#text").value = settings.text || "default text";
    document.querySelector("#time").value = settings.time || 7;
    document.querySelector("#fontSize").value = settings.fontSize || "3vw";
    document.querySelector("#runOn").value = settings.runOn || defaultBlocks;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("settings");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
