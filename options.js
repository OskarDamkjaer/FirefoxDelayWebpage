const defaultOptions = {
  color: "#fff",
  textColor: "#808080",
  time: 7,
  text: "default text",
  fontSize: "2vw",
  runOn: String.raw`hckrnews\.com
reddit\.com
facebook\.com
news\.ycombinator\.com
youtube\.com`,
  delayLinks: false,
  variance: 0,
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
      delayLinks: document.querySelector("#delayLinks").checked,
      variance: document.querySelector("#variance").value,
    },
  });
  document.getElementById("savedSettings").style = "color:green;";
}

function restoreOptions() {
  function setCurrentChoice(result) {
    const settings = (result && result.settings) || {};
    Object.keys(defaultOptions).forEach((key) => {
      const el = document.querySelector(`#${key}`);
      if (el.type === "checkbox") {
        el.checked = vOrDefault(settings[key], defaultOptions[key]);
      } else {
        el.value = vOrDefault(settings[key], defaultOptions[key]);
      }
    });
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.storage.sync.get("settings").then(setCurrentChoice, onError);
}

const permissions = { origins: ["<all_urls>"] };

function requestPermissions() {
  function onResponse(response) {
    if (response) {
      console.log("Permission was granted");
    } else {
      console.log("Permission was refused");
    }
    return browser.permissions.getAll();
  }

  browser.permissions
    .request(permissions)
    .then(onResponse)
    .then((currentPermissions) => {
      console.log(`Current permissions:`, currentPermissions);
    });
}

document
  ?.querySelector("#permissions")
  ?.addEventListener("click", requestPermissions);

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form")?.addEventListener("submit", saveOptions);

function vOrDefault(v, def) {
  if (v) {
    return v;
  } else if (v === "" || v === {} || v === 0) {
    return v;
  } else {
    return def;
  }
}
