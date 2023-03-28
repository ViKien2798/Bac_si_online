import db from '../models/index';
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFrom = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFrom,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
                
            })
            resolve('ok! created successfully');
        } catch (e) {
            reject(e);
        }
    })
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {createNewUser};