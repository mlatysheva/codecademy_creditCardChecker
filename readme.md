## This is a project from codecademy.com Full-Stack Engineer path.

### Credits are given to [codecademy.com](https://codecademy.com).

The app checks credit card numbers for validity using the *Luhn algorithm*.

There are 15 arrays that each contain the digits of separate credit card numbers, 5 being valid numbers, 5 invalid and 5 - mysterious. There is also a batch array that stores all of the provided credit cards in a single array.

1. The function `validateCred()` takes in an array and returns `true` when an array contains digits of a valid credit card number and `false` when it is invalid. This function should NOT mutate the values of the original array.
The function uses the Luhn algorithm for this.

2. The function `findInvalidCards()` takes in a nested array of credit card numbers, checks through the nested array for which numbers are invalid, and returns another nested array of invalid cards.

3. The function `idInvalidCardCompanies()` takes in a nested array of invalid numbers and returns an array of companies with unique values.

4. The function `convertToArray()` accepts a string and converts it into an array of numbers.

5. The function `convertToValid()` accepts an array representing a credit card number and converts it into a valid number by changing the check digit accordingly.