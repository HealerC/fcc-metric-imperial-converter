'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert/', function(req, res) {
    let number = convertHandler.getNum(req.query.input);
    let unit = convertHandler.getUnit(req.query.input);
    const result = convertHandler.convert(number, unit);
    res.json({string: "success", quantity: req.query.input, num: number, unit: unit, result: result});
  });

  
};
