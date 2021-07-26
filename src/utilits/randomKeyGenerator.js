export function generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  }
  
  // 40-/64-bit WEP: 10 digit key
  console.log("40-bit:" + generateHexString(10));
  
  // 104-/128-bit WEP: 26 digit key
  console.log("104-bit:" + generateHexString(26))
  
  // 256-bit WEP: 58 digit key
  console.log("256-bit:" + generateHexString(58))