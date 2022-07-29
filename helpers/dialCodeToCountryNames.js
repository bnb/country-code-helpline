// converts dial codes to country names
async function dialCodeToCountryNames (dialCode) {
  if(Object.hasOwn(dialCodes, dialCode)) {
    const names = []

    for(let entry of dialCodes[dialCode]) {
      names.push(entry.name)
    }

    return `Locations that use +${dialCode}:\n\n${names.join(', ')}`
  }
}

module.exports = dialCodeToCountryNames