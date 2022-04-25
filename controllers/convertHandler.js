function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    //const numRegex = /(^(0|[1-9]\d*)?(\.\d+)?(?<=\d))(?=\D)/;
    const unitRegex = /(?<=\d)\D+$/;
    const numExp = input.slice(0, input.search(unitRegex));
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
    const unitRegex = /(?<=\d)\D+$/;
    result = input.match(unitRegex)[0];
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
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
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
