// jshint esversion: 8

const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) throw err;
  sendText(data);
});

const sendText = (data) => {
  // console.log(data);

  const songs = data.split("\r\n");

  console.log(songs);
};
