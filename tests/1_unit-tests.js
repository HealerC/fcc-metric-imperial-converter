const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  // Tests involving input numbers
  suite('Input Numbers', function() {
    test('#extractWholeNumber', function() {
      assert.equal(convertHandler.getNum("27km"), 27, 
                    'Should extract whole number from input');
    });
    test('#extractNumberWithDecimal', function() {
      assert.equal(convertHandler.getNum("27.5mi"), 27.5, 
                    'Should be able to extract numbers with decimal point');
    });
    test('#extractNumberWithOnlyUnit', function() {
      assert.equal(convertHandler.getNum("lbs"), 1, 
                    'Should default to 1 if only unit is specified');
    });
    test('#extractFraction', function() {
      assert.equal(convertHandler.getNum("27/3gal"), 9, 
                    'Should be able to read fractional input');
    });
    test('#extractFractionWithDecimal', function() {
      assert.equal(convertHandler.getNum("27.5/0.5L"), 55, 
                    'Should be able to read fractional input with decimal point');
    });
    test('#errorOnDoubleFraction', function() {
      assert.isNotOk(convertHandler.getNum("27/5/1999km"), 
                    'Double fractions should not work');
    });
  });

  // Tests involving input units
  suite('Input Units', function(){
    test('#extractUnit', function(){
      assert.equal(convertHandler.getUnit("27km"), "km", 
                    'Should extract unit from input');
    });
    test('#errorOnInvalidUnit', function(){
      assert.isNull(convertHandler.getUnit("27watts"), 
                    'Non-valid input unit');
    });
    test('#returnUnit', function() {
      assert.equal(convertHandler.getReturnUnit("l"), "gal", 
                    'Should return correct return unit for a valid input');
    });
    test('#spellOutUnit', function() {
      assert.equal(convertHandler.spellOutUnit("l"), "liter", 
                    'Correctly spell out valid units');
    });
    
  });

  // Tests on conversions
  suite('Converter', function(){
    test('#galToL', function(){
      assert.deepEqual(convertHandler.convert('1', 'gal'), {num: 3.78541, unit: 'L'});
    });
    test('#LToGal', function(){
      assert.deepEqual(convertHandler.convert('1', 'l'), {num: 0.26417, unit: 'gal'});
    });
    test('#miToKm', function(){
      assert.deepEqual(convertHandler.convert('1', 'mi'), {num: 1.60934, unit: 'km'});
    });
    test('#kmToMi', function(){
      assert.deepEqual(convertHandler.convert('1', 'km'), {num: 0.62137, unit: 'mi'});
    });
    test('#kgToLbs', function(){
      assert.deepEqual(convertHandler.convert('1', 'kg'), {num: 2.20462, unit: 'lbs'});
    });
    test('#LbsToKg', function(){
      assert.deepEqual(convertHandler.convert('1', 'lbs'), {num: 0.45359, unit: 'kg'});
    });
  });
});