class Singleton {
    constructor() {
        throw new Error("Cannot directly create an instance of this class. Use the getInstance() instead.");
    }

    // * This is where the magic happens. Anything defined / instantiated in a static function will always
    // * be available even when this is loaded fresh in other modules, it will still include everything that
    // * was defined in the static function.
    static getInstance(){
        if (!Singleton.__instance){
            Singleton.__instance = new Employee();
        }

        return Singleton.__instance;
    }
}

class Employee{
    constructor(){
        this.id = "0000";
        this.name = "";
        this.loginId = "";
        this.state = "U"   // A-ctive, I-nactive, U-nknown
    }

    isActive = () => this.state == "A";
    terminate = () => this.state = "I";
}

module.exports = Singleton;