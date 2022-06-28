// ? This is the direct way to create an instance of this class.
// const employee = require("./singleton-class").getInstance();

// ? This shows what the class looks like before and after calling the getInstance()
const employeeGen = require("./singleton-class");

console.log("pre", employeeGen);
const employee = employeeGen.getInstance();
console.log("post", employeeGen);

// * Set the properties of the class here.
employee.id = "0001";
employee.name = "Kyle";
employee.loginId = "kyle.smithz";
employee.state = "A";

console.log("r1", employee);
