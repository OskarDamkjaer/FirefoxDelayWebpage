function onError(error) {
  console.log(
    `Error: ${error}\n\n please leave a review and tell me to fix this`
  );
}

const getting = browser.storage.sync.get("settings");
getting.then(onGot, onError);

function onGot(item) {
  const settings = item.settings || {
    color: "#fff",
    text: "default text",
    fontSize: "3vw",
    textColor: "#000",
    time: 7,
    runOn: String.raw`hckrnews\.com
reddit\.com
facebook\.com
news\.ycombinator\.com
youtube\.com`
  };
  let { color, time, text, fontSize, textColor, runOn } = settings;
  color = color || "#fff";
  text = text === "" ? "" : text || "default text";
  fontSize = "3vw";
  textColor = textColor || "#000";
  time = time === 0 ? 0 : time || 7;
  runOn =
    runOn === ""
      ? ""
      : runOn ||
        String.raw`hckrnews\.com
reddit\.com
facebook\.com
news\.ycombinator\.com
youtube\.com`;

  if (
    !runOn
      .split("\n")
      .map(s => s.trim())
      .find(pattern => RegExp(pattern).test(document.URL))
  ) {
    return;
  }
  let timeout;

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
    }, time * 1000);
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
        ? `Wait ${time} seconds for the page to load`
        : text
    )
  );
  document.documentElement.appendChild(blocking_div);

  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  removeBlockingDiv();
}
