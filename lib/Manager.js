// Require Employee class
const Employee = require("./Employee");

// Manager class inherits from Employee
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email);
        this.officeNumber = officeNumber;
        }
       
        getOfficeNumber(){
            return this.officeNumber;
            };
        getRole() {
                return "Manager";
            };
        }
        
    module.exports = Manager;