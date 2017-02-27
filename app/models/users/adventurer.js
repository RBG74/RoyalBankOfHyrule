"use strict"

var User = require('./user');

class Adventurer extends User{
    constructor(technologicalAdress, password, firstname, lastname){
        super(technologicalAdress, password, firstname, lastname);
    }

    register(){
        console.log(this.technologicalAdress+' is now registered.');
    }
}

module.exports = Adventurer;