function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    settings: {
      color: document.querySelector("#color").value,
      textColor: document.querySelector("#textColor").value,
      time: parseInt(document.querySelector("#time").value, 10),
      text: document.querySelector("#text").value,
      fontSize: document.querySelector("#fontSize").value
    }
  });
  document.getElementById("savedSettings").style = "color:green;";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "#fff";
    document.querySelector("#textColor").value = result.textColor || "#000";
    document.querySelector("#text").value = result.text || "default text";
    document.querySelector("#time").value = result.time || 7;
    document.querySelector("#fontSize").value = result.fontSize || "3vw";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("settings");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
