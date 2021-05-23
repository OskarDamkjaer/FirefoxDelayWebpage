console.log(
  browser.tabs.executeScript({
    code: `

setInterval(() => {
  console.log("HEEEj");

  const blocking_div = document.createElement("div");
  blocking_div.id = "__dly_id__";
  blocking_div.style.cssText = "background-color:red;
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
";
  blocking_div.appendChild(
    document.createTextNode("Wait 10 seconds for the page to load")
  );
  document.documentElement.appendChild(blocking_div);
  console.log(document.documentElement);
}, 1000);
`,
  })
);
