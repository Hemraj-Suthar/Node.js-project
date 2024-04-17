
const express = require('express');
const app = express();
const PORT = 3000;
 
app.get('/', function (req, res) {
    res.send("file is downloaded!")
    res.download('Unknown_file.txt', function (error) {
        console.log("Error : ", error)
    });
});
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});