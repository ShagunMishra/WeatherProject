const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); //allows to look through the body of the POST request

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html"); //sending html file in the directory

});

app.post("/", function(req, res) {

  const query = req.body.cityName; // request body of index.html for the cityName
  const apiKey = "145ef83b673ab941416e1a9b0ce9a22c";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; //fetching data from exernal server

  https.get(url, function(response) { //fetching a data from the external server
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data); //parseit in thejson

      const temp = weatherData.main.temp

      const weatherDescription = weatherData.weather[0].description

      const icon = weatherData.weather[0].icon; //icon from the weatherData

      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //to get icon from the image

      res.write("<p>The weather is currently " + weatherDescription + "<p>"); // we must have only one res.send but we could put multiple res.write()

      res.write("<h1>The temperature in " + query + " is " + temp + "degree Celsius.</h1>"); // this will give error because in any method we should have only one res.send so we have to remove res.send written downward

      res.write("<img src=" + imageURL + ">"); // to get image on the screen

      res.send();
      //console.log(temp);
      //  console.log(weatherData); // it will print whole json data in key object form.

      /*    const object = {
            name: "Angela",
            favouriteFood: "Ramen"
          }
          console.log(JSON.stringify(object));
          // it will stringyfy the object data into one string */
    })
  })
  // after this the data which we get from here is the hexadecimal code of the data and when it would be converted to the original data it would be some set of character form the weather.json file.

  //  res.send("Server is up and running.")


  console.log("Post request recieved"); //Post recived from the root directory
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
