const dbModule = require('./database/db-module');
const {badParameters, uniqueViolation} = require("../specification/error-cases");

/*
Il gruppo database deve fare le query che inseriscono e restituiscono contemporaneamente(meno lavoro per noi)
 */

/**USER RALATED****************************************************************************************************** */
// ==== create user in "users" table ===================================================================================
exports.createUser = async (username, mail, password, name, surname, dob, sex) => {
    if (!username || !mail || !password || !name || !surname || !dob || !sex ) return badParameters.errorCode;
    try {
        //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
        const userId = await dbModule.query(
            ``,//TODO restituisce lo userId in base alla mail
            [mail]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "", //TODO inserisce un nuovo utente e ritorna il token
            [username, mail, password, name, surname, dob, sex]
        );

    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service createUser(): ${e}`)
    }
};

// ==== get user info in "users" table =================================================================================
exports.getUserInfo = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        //si recupere l'id dalla tabella session(idToken, idUtente, Token)
        const userId = await dbModule.query(
            ``,//TODO restituisce lo userId in base al token
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "", //TODO recupera le informazioni dello User
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service getUserInfo(): ${e}`)
    }
};

// ==== delete user in "users" table ===================================================================================
exports.deleteUser = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
        const userId = await dbModule.query(
            ``,//TODO restituisce lo userId in base al token
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "", //TODO disattiva/cancella tutto cio che è legato allo User
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`)
    }
};

/**AUTH RALATED****************************************************************************************************** */
// ==== start session in "session" =====================================================================================
exports.logIn = async (mail, password) => {
    if (!mail || !password) return badParameters.errorCode;

    try {
        //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
        const userId = await dbModule.query(
            ``, //TODO ottiene id utente in basse alla mail e la password
            [mail, password]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "", //TODO disattiva/cancella tutto cio che è legato allo User
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`)
    }
};

// ==== end session in "session" =======================================================================================
exports.logOut = async (mail, password) => {
    if (!mail || !password) return badParameters.errorCode;
    /*
    try {
        //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
        const userId = await dbModule.query(
            ``, //TODO ottiene id utente in basse alla mail e la password
            [mail, password]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "", //TODO disattiva/cancella tutto cio che è legato allo User
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`)
    }
    */
};