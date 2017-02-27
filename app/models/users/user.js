"use strict"

class User{
    constructor(technologicalAdress, password, firstname, lastname){
        if(this.validateTechnologicalAdress(technologicalAdress))
            this.technologicalAdress = technologicalAdress;
        else
            throw new Error('This is not a correct technological adress.');
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getFullName(){
        return this.firstname + ' ' + this.lastname;
    }

    validateTechnologicalAdress(technologicalAdress) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(technologicalAdress);
    }
}

module.exports = User;