'use strict';

const { Contract } = require('fabric-contract-api');
const bloodCollection = 'bloodProfile';


class BloodContract extends Contract{
    
    constructor(){
        super('contract.bloodPro-chain');
    }

    async instantiate(ctx){
        console.log('Instantiate blood pro-chain contract');
    }

    /**
     * create data of new Blood record
     * @param {*} ctx 
     * @param {*} donorID 
     * @param {*} bloodID 
     * @param {*} bloodGroup 
     * @param {*} bloodProduction 
     * @param {*} temp 
     * @param {*} humidity 
     * @param {*} time 
     * @param {*} date 
     * @param {*} duration 
     * @param {*} state 
     * @param {*} locate 
     */
    async createBloodProfile(ctx, donorID, bloodID, bloodGroup, bloodProduction, temp, humidity, time, date, duration, state, locate){
        
        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!donorID){
                throw new Error('donorID is invalid');
            }

            if (!bloodID){
                throw new Error('bloodID is invalid');
            }

            if (!bloodGroup){
                throw new Error('bloodGroup is invalid');
            }

            if (!bloodProduction){
                throw new Error('bloodProduction is invalid');
            }

            if (!temp){
                throw new Error('temp type is invalid');
            }

            if (!humidity){
                throw new Error('humidity type is invalid');
            }

            if (!time){
                throw new Error('time type is invalid');
            }

            if (!date){
                throw new Error('date type is invalid');
            }

            if (!duration){
                throw new Error('duration type is invalid');
            }

            if (!state){
                throw new Error('state type is invalid');
            }

            if (!locate){
                throw new Error('locate type is invalid');
            }

            let bloodDataObject = {
                "donorID": donorID,
                "bloodID": bloodID,
                "bloodGroup": bloodGroup,
                "bloodProduction": bloodProduction,
                "temp": temp,
                "humidity": humidity,
                "time": time,
                "date": date,
                "duration": duration,
                "state": state,
                "locate": locate
                };

            //store to ledger 
            await ctx.stub.putState(bloodID, Buffer.from(JSON.stringify(bloodDataObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * query profile data
     * @param {*} ctx 
     * @param {*} donorsID 
     * @returns 
     */
    async queryProfile(ctx, bloodID){        
        try {
            //get data of profile
            let bloodProfileAsByte = await ctx.stub.getState(bloodID);
            //check data
            if (!bloodProfileAsByte || bloodProfileAsByte.toString().length <= 0){
                throw new Error('data of profile ' + bloodID + ' does not exist');
            }
            
            //convert byte data to json
            let bloodProfile = JSON.parse(bloodProfileAsByte.toString());
            return bloodProfile;
        } catch (error) {
            throw new Error('Error ' + error);
        }
        
    }

    /**
     * update new data of Blood record
     * @param {*} ctx 
     * @param {*} donorID 
     * @param {*} bloodID 
     * @param {*} bloodGroup 
     * @param {*} bloodProduction 
     * @param {*} temp 
     * @param {*} humidity 
     * @param {*} time 
     * @param {*} date 
     * @param {*} duration 
     * @param {*} state 
     * @param {*} locate 
     */
     async updateBloodProfile(ctx, bloodID, newBloodGroup, newBloodProduction, newTemp, newHumidity, newTime, newDate, newDuration, newState, newLocate){
        
        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!bloodID){
                throw new Error('bloodID is invalid');
            }

            if (!newBloodGroup){
                throw new Error('newBloodGroup is invalid');
            }

            if (!newBloodProduction){
                throw new Error('newBloodProduction is invalid');
            }

            if (!newTemp){
                throw new Error('newTemp type is invalid');
            }

            if (!newHumidity){
                throw new Error('newHumidity type is invalid');
            }

            if (!newTime){
                throw new Error('newTime type is invalid');
            }

            if (!newDate){
                throw new Error('newDate type is invalid');
            }

            if (!newDuration){
                throw new Error('newDuration type is invalid');
            }

            if (!newState){
                throw new Error('newState type is invalid');
            }

            if (!newLocate){
                throw new Error('newLocate type is invalid');
            }

            let oldBloodProfileAsByte =  await ctx.stub.getState(bloodID);

            if(!oldBloodProfileAsByte || oldBloodProfileAsByte.toString().length <= 0){
                throw new Error('data of profile ' + bloodID + ' does not exist');
            }

            let bloodProfileAsJson = JSON.parse(oldBloodProfileAsByte.toString());
            bloodProfileAsJson.bloodGroup = newBloodGroup;
            bloodProfileAsJson.bloodProduction = newBloodProduction;
            bloodProfileAsJson.temp = newTemp;
            bloodProfileAsJson.humidity = newHumidity;
            bloodProfileAsJson.time = newTime;
            bloodProfileAsJson.date = newDate;
            bloodProfileAsJson.duration = newDuration;
            bloodProfileAsJson.state = newState;
            bloodProfileAsJson.locate = newLocate;

            //store to ledger 
            await ctx.stub.putState(bloodID, Buffer.from(JSON.stringify(bloodProfileAsJson)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * create data in use of blood data
     * @param {*} ctx 
     * @param {String} donorsID 
     * @param {String} name 
     * @param {String} age 
     * @param {String} dob 
     * @param {String} bloodType 
     * @param {String} amount 
     */
    async createDataInUse(ctx, bloodID, donorsID, name, dateInUse, timeInUse, lstAuth, bloodType){
        
        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!bloodID){
                throw new Error('bloodID is invalid');
            }

            if (!donorsID){
                throw new Error('donorsID is invalid');
            }

            if (!name){
                throw new Error('name is invalid');
            }

            if (!dateInUse){
                throw new Error('dateInUse is invalid');
            }

            if (!timeInUse){
                throw new Error('timeInUse is invalid');
            }

            if (!lstAuth){
                throw new Error('lstAuth is invalid');
            }

            if (!bloodType){
                throw new Error('blood type is invalid');
            }

            let bloodDataObject = {
                "donorsID": donorsID,
                "bloodID": bloodID,
                "name": name,
                "dateInUse": dateInUse,
                "timeInUse": timeInUse,
                "lstAuth": lstAuth,
                "bloodType": bloodType
            };

            //store to ledger 
            await ctx.stub.putState(donorsID, Buffer.from(JSON.stringify(bloodDataObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * delete profile data
     * 
     * @param {Context} ctx 
     * @param {String} donorsID 
     */
    async deleteProfile(ctx, donorsID){
        try {
            await ctx.stub.deleteState(donorsID);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}

module.exports = BloodContract;