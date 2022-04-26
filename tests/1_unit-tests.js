const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Input Numbers', function() {
    test('#readNumberInput', function() {
      assert.equal(convertHandler.getNum("27km"), 27, 
                    'Should extract whole number from input');
      assert.equal(convertHandler.getNum("27.5mi"), 27.5, 
                    'Should be able to extract numbers with decimal point');
      assert.equal(convertHandler.getNum("27/3gal"), 9, 
                    'Should be able to read fractional input');
      assert.equal(convertHandler.getNum("27.5/0.5L"), 55, 
                    'Should be able to read fractional input with decimal point');
      assert.isNotOk(convertHandler.getNum("27/5/1999km"), 
                    'Double fractions should not work');    
    });
  });
  suite('Input Units', function(){
    test('#readUnitInput', function() {
      assert.equal(convertHandler.getUnit("27km"), "km", 
                    'Should extract unit from input');
      assert.isNull(convertHandler.getUnit("27watts"), 
                    'Non-valid input unit');
    });
    test('#returnUnit', function() {
      assert.equal(convertHandler.getReturnUnit("l"), "gal", 
                    'Should return correct return unit for a valid input');
    });
    test('#spellOutUnit', function() {
      assert.equal(convertHandler.spellOutUnit("l"), "litre", 
                    'Correctly spell out valid units');
    });
  });
  suite('Converter', function(){
    test('#converter', function(){
      assert.deepEqual(convertHandler.convert('1', 'gal'), {num: 3.78541, unit: 'L'});
      assert.deepEqual(convertHandler.convert('1', 'l'), {num: 0.26417, unit: 'gal'});
      assert.deepEqual(convertHandler.convert('1', 'mi'), {num: 1.60934, unit: 'km'});
      assert.deepEqual(convertHandler.convert('1', 'km'), {num: 0.62137, unit: 'mi'});
      assert.deepEqual(convertHandler.convert('1', 'kg'), {num: 2.20462, unit: 'lbs'});
      assert.deepEqual(convertHandler.convert('1', 'lbs'), {num: 0.45359, unit: 'kg'});
    });
  });
});