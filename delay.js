function removeBlockingDiv(time = 5000) {
    timeout = setTimeout(() => {
        if (document.visibilityState === "visible") {
            document.getElementById("__dly_id__").remove()
            document.removeEventListener("visibilitychange", handleVisibilityChange, false)
        }
    }, time)
}

// Handle when tab gains focus
function handleVisibilityChange(time) {
    return () => {
        if (document.visibilityState === "visible") {
            removeBlockingDiv(time)
        } else {
            clearTimeout(timeout)
        }
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot() {
    const bg_color = item.bg_color || "#3CAEA3";
    const time = item.time || 5000;

    const blocking_div = document.createElement("div");
    blocking_div.id = "__dly_id__"
    blocking_div.style.cssText = `background-color:${bg_color};
font-size:7vw;
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
color:black;`
    blocking_div.appendChild(document.createTextNode("Wait five seconds for the page to load"));
    document.body.appendChild(blocking_div);
    document.addEventListener("visibilitychange", handleVisibilityChange(time), false);
    removeBlockingDiv(time)
}

const getter = browser.storage.sync.get("bg_color");
getter.then(() => onGot(time), onError);
let timeout;
