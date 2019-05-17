const axios = require('axios');
const file1 = require('./Competitor2017.json')
const file2 = require('./Competitor2018.json');

const url = 'http://localhost:5000'

//console.log(file1[0])
// const year2017 = JSON.parse(file1)
// const year2018 = JSON.parse(file2)
//console.log(file2)

// Read file1 and parse to do that 
// for (x in year2017) {
//     console.log(x)
// }

const year = 2017;
const values = file1.map(element => {
    //PLay with element
    const prices = Object.keys(element).reduce((accumulator, currentKey) => {
        const value = element[currentKey];
        !isNaN(value) && accumulator.push(value)
        // if(parseFloat(value)){
        //     accumulator.push(value)
        // }
        return accumulator
    }, [])

const Summer = prices.slice(2,8);
const Winter = [].concat(prices.slice(0,2),prices.slice(8,));
const minSummer = Math.min(...Summer);
const minWinter = Math.min(...Winter);
console.log(Summer, Winter, minSummer, minWinter)
const body = {
    name: element.COMPETITOR,
    year,
    prices,
    }
    // axios.post(url + '/competitor-rate', { body }).then(reponse => {
    //     console.log(response)
    // }).catch(err => {
    //     console.log(err);
    // })
})



