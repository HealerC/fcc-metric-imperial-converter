function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numRegex = /^\d+(?=\w)/;
    result = input.match(numRegex)[0];
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegex = /(?<=\d)\D+$/;
    result = input.match(unitRegex)[0];
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const unit = initUnit.toLowerCase();
    const conjugateUnits = {
      "gal": "l",
      "l": "gal",
      "km": "mi",
      "mi": "km",
      "lbs": "kg",
      "kg": "lbs"
    }
    result = conjugateUnits[unit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const unit = initUnit.toLowerCase();
    switch(unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = galToL / initNum;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = lbsToKg / initNum;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = miToKm / initNum;
        break;
      default:
        result = null;
    }
    return result ? result + this.getReturnUnit(initUnit) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
