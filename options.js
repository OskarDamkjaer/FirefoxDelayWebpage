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
    newSettings: { useNewSettings: true },
  });
  document.getElementById("savedSettings").style = "color:green;";
}

function restoreOptions() {
  // duplicated to avoid using bundler
  const old_default_settings = {
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

  function setCurrentChoice(result) {
    const settings = (result && result.settings) || {};
    Object.keys(old_default_settings).forEach((key) => {
      const el = document.querySelector(`#${key}`);
      if (el.type === "checkbox") {
        el.checked = vOrDefault(settings[key], old_default_settings[key]);
      } else {
        el.value = vOrDefault(settings[key], old_default_settings[key]);
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
