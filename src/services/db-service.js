const dbModule = require('./database/db-module');
const {badParameters, uniqueViolation} = require("../specification/error-cases");

// ==== create user in "users" table ====================================================================================
exports.createUser = async (username, mail, password, name, surname, dob, sex) => {
    if (!username || !mail || !password || !name || !surname || !dob || !sex ) return badParameters.errorCode;
    try {
        //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
        //sostituire con procedure
        const userId = await dbModule.query(
            `SELECT user_id
             FROM users
             WHERE mail = ?`,
            [mail]
        );

        if (userId.length) return uniqueViolation.errorCode;
        //sostituire con procedure
        return await dbModule.query(
            "INSERT INTO users('username', 'mail', 'password', 'name', 'surname', 'dob', 'sex') VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, mail, password, name, surname, dob, sex]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service createUser(): ${e}`)
    }
};