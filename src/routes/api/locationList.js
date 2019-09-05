const express = require('express');
const path = require('path');
const fs = require('fs');
const jsonReader = require('../../utils/jsonReader');

const app = express();

const filePath = path.join(__dirname, '../../data/locationList.json');

app.get('/api/locationList', (req, res) => {

  jsonReader(filePath, (err, locationList) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err
      });
    }

    res.status(200)
       .json(locationList);
  })

});

app.post('/api/locationList', (req, res) => {

  let { coordinates, name, adress, category } = req.body;

  jsonReader(filePath, (err, locationList) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err
      });
    }

    locationList.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coordinates
      },
      "properties": {
        "name": name,
        "adress": adress,
        "category": category
      }
    });

    fs.writeFile(filePath, JSON.stringify(locationList), err => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
      }

      res.status(200).json({
        ok: true
      });
    });
    
  });

})

module.exports = app;

