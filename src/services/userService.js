import db from '../models/index'
import bcrypt from 'bcryptjs';

//email
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exists
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'], 
                    where: { email: email},
                    raw: true,
                })
                if (user){
                    // compare the password
                    //bcrypt.compareSync("not_bacon",hash);//false
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        //có người dùng thì xóa password (ko hiển thị password)
                        delete user.password;
                        userData.user = user;
                    } else{
                        userData.errCode = 3;
                        userData.errMessage = "wrong password";
                    }
                } else {
                    userData.errCode = 2,
                    userData.errMessage = "User not found"
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system, Plz try other email`;
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
};
// password
/**
 * database: luu user password: abcs000adsd (plan text)
 * 
 */

//check email 
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail}
            })
            if(user){
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {handleUserLogin}