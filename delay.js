const defaults = {
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

browser.storage.sync.get("settings").then(onGot, onError);

let timeout;

function onGot(item) {
  const settings = item.settings || defaults;
  const color = vOrDefault(settings.color, defaults.color);
  const textColor = vOrDefault(settings.textColor, defaults.textColor);
  const time = vOrDefault(settings.time, defaults.time);
  const text = vOrDefault(settings.text, defaults.text);
  const fontSize = vOrDefault(settings.fontSize, defaults.fontSize);
  const runOn = vOrDefault(settings.runOn, defaults.runOn);
  const delayLinks = vOrDefault(settings.delayLinks, defaults.delayLinks);
  const variance = vOrDefault(settings.variance, defaults.variance);

  const sign = Math.random() < 0.5 ? 1 : -1;
  const actualVariance = Math.random() * variance * sign;
  const blockTime = Math.max(0, 1000 * (time + actualVariance));

  const urlMatchesSettings = (url) =>
    runOn
      .split("\n")
      .map((s) => s.trim())
      .find((pattern) => RegExp(pattern).test(url));

  if (urlMatchesSettings(document.URL)) {
    // continue
  } else {
    if (delayLinks) {
      if (urlMatchesSettings(document.referrer)) {
        //continue
      } else {
        return;
      }
    } else {
      return;
    }
  }

  function removeBlockingDiv() {
    timeout = setTimeout(() => {
      if (document.visibilityState === "visible") {
        document.getElementById("__dly_id__").remove();
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
          false
        );
      }
    }, blockTime);
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      removeBlockingDiv();
    } else {
      clearTimeout(timeout);
    }
  }

  const blocking_div = document.createElement("div");
  blocking_div.id = "__dly_id__";
  blocking_div.style.cssText = `background-color:${color};
font-size:${fontSize};
padding-top:7vh;
position:fixed;
top:0;
left:0;
width:100vw;
height:10000px;
text-align:center;
z-index:999999999;
line-height:normal;
font-weight: normal;
color:${textColor};`;
  blocking_div.appendChild(
    document.createTextNode(
      text === "default text"
        ? `Wait ${
            Math.round(blockTime / 100) / 10
          } seconds for the page to load`
        : text
    )
  );
  document.documentElement.appendChild(blocking_div);

  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  if (urlMatchesSettings("youtube.com")) {
    function handleYtPageChange() {
      const el = document.getElementById("__dly_id__");
      if (!el) {
        // on full reload el is already mounted
        document.documentElement.appendChild(blocking_div);
        setTimeout(() => {
          document.getElementById("__dly_id__").remove();
        }, blockTime);

        // pause video to prevent audio in background
        const v = document.querySelector("video");
        if (v) {
          v.pause();
        }
      }
    }
    window.addEventListener("yt-page-data-updated", handleYtPageChange, false);
  }

  // an attempt to handle SPA page-changes
  lastSpaPath = new URL(document.URL).pathname;

  document.addEventListener(
    "mouseup",
    () => {
      if (new URL(document.URL).pathname !== lastSpaPath) {
        lastSpaUrl = document.URL;
        const el = document.getElementById("__dly_id__");
        if (!el) {
          document.documentElement.appendChild(blocking_div);
          setTimeout(() => {
            document.getElementById("__dly_id__").remove();
          }, blockTime);
        }
      }
    },
    true
  );

  removeBlockingDiv();
}
let lastSpaPath = "";

function onError(error) {
  console.log(
    `The DelayWebpage had an error, please leave a review or open an issue at https://github.com/OskarDamkjaer/FirefoxDelayWebpage. The error was: \n\n ${error}`
  );
}

function vOrDefault(v, def) {
  if (v) {
    return v;
  } else if (v === "" || v === {} || v === 0) {
    return v;
  } else {
    return def;
  }
}
