const blocking_div = document.createElement("div");
blocking_div.style.cssText = `background-color:rgb(32, 32, 32);
font-size:5vw;
padding-top:7vh;
position:fixed;
top:0;
left:0;
width:100vw;
height:10000px;
text-align:center;
z-index:9999999999;
line-height:normal;
font-weight: normal; 
color:#FFF;
white-space:pre;
`;

function blockFeeds() {
  blocking_div.appendChild(
    document.createTextNode(`You've blocked ${document.title} on odd days`)
  );
  document.documentElement.appendChild(blocking_div);
}

const date = new Date().getDate();

if (date % 2) {
  blockFeeds();
}
