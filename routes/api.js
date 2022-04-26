'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert/', function(req, res) {
    const input = req.query.input;
    let number = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    
    errorChecker(number, unit);   // Throw errorrs if the number/unit is invalid
    
    const {num: returnNum, unit: returnUnit} = convertHandler.convert(number, unit);
    const convString = convertHandler.getString(number, unit, returnNum, returnUnit);
    
    res.json(
      { 
        initNum: number,
        initUnit: unit,
        returnNum,
        returnUnit,
        string: convString
      }
    );
  });

  function errorChecker(number, unit) {
    if (!number && !unit) throw new TypeError("invalid number and unit");
    if (!number) throw new TypeError("invalid number");
    if (!unit) throw new TypeError("invalid unit");
  }
  
};
