'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert/', function(req, res) {
    let number = convertHandler.getNum(req.query.input);
    let unit = convertHandler.getUnit(req.query.input);
    const {num: returnNum, unit: returnUnit} = convertHandler.convert(number, unit);
    const result = {returnNum, returnUnit};
    const convString = convertHandler.getString(number, unit, returnNum, returnUnit);
    res.json({ 
      initNum: number,
      initUnit: unit,
      ...result,
      string: convString});
  });

  
};
