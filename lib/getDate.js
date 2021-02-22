let date1 = new Date()
const options = {}
options.weekday = 'short'
options.month = 'short'
options.day = 'numeric'
options.year = 'numeric'
options.hour = 'numeric'
options.minute = 'numeric'
options.second = 'numeric'

date1 = date1.toLocaleDateString('en-US',options)
date1 = date1.replace(/,/g,'')


let date2 = new Date()
const date2Options ={}
date2Options.timeZone = 'UTC'
date2Options.timeZoneName = 'short'

date2 = date2.toLocaleDateString('en-US',date2Options)
date2 = date2.replace(/[^A-Z]+/g,'')

let date3 = new Date()
const date3Options = {}
date3Options.timeZone = 'UTC'
date3Options.timeZoneName = 'long'
date3 = date3.toLocaleDateString('en-US',date3Options)
date3 = date3.replace(/[^A-Za-z \n]+/g,'')
date3 = date3.replace(/^ /,'')

const templateDate = `${date1} ${date2} (${date3})`

const getDate = () => templateDate

module.exports = getDate