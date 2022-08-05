// description:this is a function that validates external
// untrusted input. we're only expecting up to three digits,
// so it's theoretically pretty straightforward to manage.
//
// one note is that we also take in an input.
// when the input is `code`, it's being passed by the program.
// when the input is `user`, it's being passed by a user.
async function validateCountryCode (countryCode, input) {
  const regex = /^\d{1,3}$/
  // this more simply validates that the string we're passed is a number that has up to three characters.
  if (typeof countryCode !== 'string') {
    const response = 'countryCode must be a string. Please make it a string.'
    if (input === 'code') {
      throw new Error(response)
    }

    if (input === 'user') {
      return `${response}`
    }
  } else if (regex.test(countryCode) !== true) {
    const response = 'You have entered an invalid countryCode. Please enter a valid countryCode.'
    if (input === 'code') {
      throw new Error(response)
    }

    if (input === 'user') {
      return `${response}`
    }
  } else {
    return countryCode
  }
}

module.exports = validateCountryCode
