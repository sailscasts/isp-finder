const prefixData = require('../utils/data.json');
const numberValidator = require('../utils/numberValidator.js');

const checkerFunction = function(number){
    var issuer = '';
    var prefix;
    if(numberValidator(number)){
        prefix = number.slice(0,4);
        if(prefix === '+234'){
            if(number[4] !== '0'){
                prefix = '0'+number.slice(4,7);
            }
            else{
                prefix = number.slice(4,8);
            }
        }
        console.log(prefix);
        Object.entries(prefixData).forEach(([key, value]) => {
            if(value.includes(prefix)){
                issuer = key;
            }
        });
        console.log(`your network provider is ${issuer}`);

    }else{
        console.log('please enter a valid number');
        throw new Error('Invalid Number');
    }
    return issuer;
}

module.exports = checkerFunction;