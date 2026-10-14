const https = require("https");
https.get("https://ethixweb.com/", (res) => {
  let html = "";
  res.on("data", chunk => html += chunk);
  res.on("end", () => {
    console.log("HTML length:", html.length);
    const nav = html.match(/<nav[\s\S]*?<\/nav>/i);
    if (nav) {
      console.log("Nav:", nav[0].slice(0, 1500));
    } else {
      console.log("First 1500 chars of body:", html.match(/<body[\s\S]*?<\/body>/i)?.[0]?.slice(0, 1500));
    }
  });
});
