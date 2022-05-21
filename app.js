const express = require("express");
const app = express();
app.use(express.static('public'));
const PORT = 3000;

app.get("/",(req, res) => {
   res.send("Hello World");
});

app.listen(PORT, () => {
   console.log(`My sharing app is listening on ${PORT}`);
})

