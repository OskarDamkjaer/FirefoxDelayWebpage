const defaults = {
  color: "#fff",
  textColor: "#000",
  time: 7,
  text: "default text",
  fontSize: "3vw",
  runOn: String.raw`hckrnews\.com
reddit\.com
facebook\.com
news\.ycombinator\.com
youtube\.com`,
  delayLinks: false
};

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    settings: {
      color: document.querySelector("#color").value,
      textColor: document.querySelector("#textColor").value,
      time: parseFloat(document.querySelector("#time").value, 10),
      text: document.querySelector("#text").value,
      fontSize: document.querySelector("#fontSize").value,
      runOn: document.querySelector("#runOn").value,
      delayLinks: document.querySelector("#delayLinks").checked
    }
  });
  document.getElementById("savedSettings").style = "color:green;";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    const settings = (result && result.settings) || {};
    Object.keys(defaults).forEach(key => {
      const el = document.querySelector(`#${key}`);
      if (el.type === "checkbox") {
        el.checked = vOrDefault(settings[key], defaults[key]);
      } else {
        el.value = vOrDefault(settings[key], defaults[key]);
      }
    });
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.storage.sync.get("settings").then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function vOrDefault(v, def) {
  if (v) {
    return v;
  } else if (v === "" || v === {} || v === 0) {
    return v;
  } else {
    return def;
  }
}
