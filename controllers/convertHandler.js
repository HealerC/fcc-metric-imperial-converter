function ConvertHandler() {

  this.conjugateUnits = {
    "gal": "L",
    "l": "gal",
    "km": "mi",
    "mi": "km",
    "lbs": "kg",
    "kg": "lbs"
  }

  this.getNum = function(input) {
    let result;
    //const numRegex = /(^(0|[1-9]\d*)?(\.\d+)?(?<=\d))(?=\D)/;
    const unitRegex = /(?<=\d)\D+$/;
    const unitIndex = input.search(unitRegex);
    if (unitIndex < 0) {
      return 1;
    }
    const numExp = input.slice(0, unitIndex);
    
    const divisorIndex = numExp.indexOf("/");
    if (divisorIndex !== -1) {
      const left = Number(numExp.slice(0, divisorIndex));
      const right = Number(numExp.slice(divisorIndex+1));
      result = left / right;
    } else {
      result = Number(numExp);
    }
    //console.log(input.match(numRegex));
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegex = /\D+$/;
    result = input.match(unitRegex)[0];
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
      "l": "litre",
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
    console.log(initNum);
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
        result = null;
    }
    return result ? {num: result.toFixed(5), unit: this.getReturnUnit(initUnit)} : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    console.log(initNum != 1);
    let result = `${initNum} ${this.spellOutUnit(initUnit) + (initNum != 1 ? "s" : "")} converts to ${returnNum} ${this.spellOutUnit(returnUnit) + (returnNum != 1 ? "s" : "")}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
