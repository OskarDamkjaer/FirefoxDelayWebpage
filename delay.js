function removeBlockingDiv() {
    timeout = setTimeout(() => {
        if (document.visibilityState === "visible") {
            document.getElementById("__dly_id__").remove()
            document.removeEventListener("visibilitychange", handleVisibilityChange, false)
        }
    }, 7000)
}

// Handle when tab gains focus
function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
        removeBlockingDiv()
    } else {
        clearTimeout(timeout)
    }
}

const blocking_div = document.createElement("div");
blocking_div.id = "__dly_id__"
blocking_div.style.cssText = `background-color:#3CAEA3;
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
blocking_div.appendChild(document.createTextNode("Wait seven seconds for the page to load"));
document.body.appendChild(blocking_div);

document.addEventListener("visibilitychange", handleVisibilityChange, false);
removeBlockingDiv()
let timeout;
