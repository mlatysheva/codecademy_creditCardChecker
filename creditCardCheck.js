/* This is a program to check if a credit card is valid. It the card is invalid, 
the program changes the check digit to make it valid.*/

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

/* Based on Luhn algorithm, check a credit card numeber and return true when 
an array contains digits of a valid credit card number and false when 
it is invalid. */

/* Helper function to find the Luhn sum and the check digit. */

function findLuhnSum(array) {
  let copiedArray = [...array];
  let checkDigit = copiedArray.splice(array.length-1)[0];
  let newArray = [];
  for (let digit = array.length-1; digit > 0; digit -=2) {
    newArray.push(array[digit]);
    let doubledDigit = array[digit-1] *2;
    if (doubledDigit > 9) {
      doubledDigit = doubledDigit - 9;
    }
    newArray.push(doubledDigit);
    if (array.length % 2 !== 0) {
        newArray.push(array[digit-1]);
    }
  } 
  let sumArr = newArray.reduce(function(a, b) {
        return a + b;
    }, 0);
  return [sumArr, checkDigit];
}

/* Test findLuhnSum */
// console.log(findLuhnSum(invalid1));

/* Based on Luhn algorithm, check a credit card numeber and return true when 
an array contains digits of a valid credit card number and false when 
it is invalid. */

function validateCred(array) {
  let luhnSum = findLuhnSum(array)[0];
      if (luhnSum % 10 === 0) {
      return true;
    } else return false;
}
/* Test validateCred() */

// for (card in batch) {
//   // console.log(`the card is ${batch[card]}`);
//   console.log(validateCred(batch[card]));
// }

/* Check through the nested array for which numbers are invalid, 
and return another nested array of invalid cards. */

function findInvalidCards(cardsArray) {
  let invalidCards = [];
  for (card in cardsArray) {
    if (!validateCred(cardsArray[card])) {
      invalidCards.push(cardsArray[card]);
    }    
  }
  return invalidCards;
}

/* Test findInvalidCards */

// console.log(findInvalidCards(batch));

/* Find companies that have mailed out cards with invalid numbers. 
The returned array should NOT contain duplicates 
The function accepts one parameter for a nested array of invalid numbers and 
returns an array of companies. */

function idInvalidCardCompanies(invalidCardArray) {
  let companies = [];
  for (card in invalidCardArray) {
    switch(invalidCardArray[card][0]) {
      case 3: 
        companies.push('Amex');
        break;
      case 4: 
        companies.push('Visa');
        break;
      case 5:
        companies.push('Mastercard');
        break;
      case 6: 
        companies.push('Discover');
        break;
      default:
        console.log('The company is NOT found');
        break;
    }
  }
  return [...new Set(companies)];
}

/* Test idInvalidCardCompanies() */

// console.log(idInvalidCardCompanies(findInvalidCards(batch)));

/* Helper function. Convert a string into an array of numbers to make it 
easier to check credit card numbers. */

function stringToArray(string) {
  return [...string];
}
/* Test stringToArray */ 
// console.log(stringToArray('6370063983767499'));

/* Convert an invalid credit card number to a valid one by changing the check digit.*/

function convertToValid(array) {
  let newArray = [...array];
  let [ luhnSum, checkDigit ] = findLuhnSum(newArray);
  if (luhnSum % 10 !== 0) {
    checkDigit = 10 - ((luhnSum - checkDigit) % 10);
  }
  array.splice(-1, 1, checkDigit);
  return array;
}

/* Test convertToValid */

console.log(`invalid2 is ${invalid2}`);
console.log(`The Luhn sum of invalid2 is ${findLuhnSum(invalid2)[0]}`)
let newValid2 = convertToValid(invalid2);
console.log(`newValid2 is ${newValid2}`);
console.log(`The Luhn sum of newValid2 is ${findLuhnSum(newValid2)[0]}`);
console.log(`Is the newValid2 valid? ${validateCred(newValid2)}`);