// ? This shows that when you load the class in another module...
const employee = require("./singleton-class").getInstance();

// ? ... it retains everything that was done from the other module.
console.log("r2", employee);
