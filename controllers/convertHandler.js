function ConvertHandler() {

  // All the units that "should" be provided and will be used
  this.conjugateUnits = {
    "gal": "L",
    "l": "gal",
    "km": "mi",
    "mi": "km",
    "lbs": "kg",
    "kg": "lbs"
  }

  /* Just get the unit and remove it to get the number (string).
  If the number has a division sign '/' (fraction), act accordingly */
  this.getNum = function(input) {
    let result;
    const unitRegex = /(?<=\d)\D+$/;
    const unitIndex = input.search(unitRegex);
    if (unitIndex < 0) {
      return 1;   // A number was not provided. Just the unit. Defaults to 1
    }
    const numExp = input.slice(0, unitIndex); // Remove the unit
    
    /* Series of operations to handle fractions */
    const divisorIndex = numExp.indexOf("/");
    if (divisorIndex !== -1) {
      const left = Number(numExp.slice(0, divisorIndex));
      const right = Number(numExp.slice(divisorIndex+1));
      result = left / right;
    } else {
      result = Number(numExp);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegex = /\D+$/;
    result = input.match(unitRegex);
    if (!result) return null;

    result = result[0].toLowerCase();
    
    // in case the unit provided is non-valid
    if (!this.conjugateUnits[result]) return null;
    if (result === 'l') {
      return result.toUpperCase();
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const unit = initUnit.toLowerCase();
    result = this.conjugateUnits[unit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const unitsInFull = {
      "gal": "gallon",
      "l": "liter", "L": "liter",
      "km": "kilometer",
      "mi": "mile",
      "kg": "kilogram",
      "lbs": "pound"
    }
    result = unitsInFull[unit];
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
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = null;    // somehow a non-valid unit is provided
    }
    return result ? { num: Number(result.toFixed(5)), 
                      unit: this.getReturnUnit(initUnit)
                    } : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)}s converts to ` +
                  `${returnNum} ${this.spellOutUnit(returnUnit)}s`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
