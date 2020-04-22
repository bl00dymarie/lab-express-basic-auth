const bcrypt = require("bcryptjs")

const hash = bcrypt.hashSync("hello", "$2b$10$Ut1ybuuUzq3cbo4n6Iq1xO")
console.log(hash)