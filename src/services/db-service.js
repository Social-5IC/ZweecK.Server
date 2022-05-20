const dbModule = require("./database/db-module");
const {
    badParameters,
    uniqueViolation,
} = require("../specification/error-cases");
const {verify, generate} = require("password-hash");

/**
 * ==== AUTH RELATED ===================================================================================================
 */
// ==== start session in "session" =====================================================================================

exports.logIn = async (mail, password) => {
    if (!mail || !password) return badParameters.errorCode;

    try {
        const infoUs = await dbModule.query(
            `EXEC getUserbyEmail @mail = :mail`,
            [mail]
        );
        if (verify(password, infoUs["password"])) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC getToken @idUser :userId",
            [infoUs["userId"]]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`);
    }
};

// ==== end session in "session" =======================================================================================

exports.logOut = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC CloseSession @idUser = :userId",
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`);
    }
};

/**
 * ==== USER RELATED ===================================================================================================
 */
// ==== create user in "users" table ===================================================================================

exports.createUser = async (
    name,
    surname,
    username,
    mail,
    password,
    dob,
    sex,
    language,
    isAdvertiser
) => {
    if (!username || !mail || !password || !name || !surname || !dob || !sex || !isAdvertiser)
        return badParameters.errorCode;
    try {
        const userId = await dbModule.query(
            `EXEC getUserbyEmail @mail = :mail`,
            [mail]
        );
        let passCript = generate(password);
        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC insertUser @username = :username, @mail = :mail, @password = :passCript, @name = :name, @surname = :surname, @dob = :dob, @isAdvertiser = :isAdvertiser",
            [username, mail, passCript, name, surname, dob, sex, isAdvertiser]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service createUser(): ${e}`);
    }
};

// ==== get user info in "users" table =================================================================================

exports.getUserInfo = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC getUserInfo @userId = :userId",
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service getUserInfo(): ${e}`);
    }
};

// ==== delete user in "users" table ===================================================================================

exports.deleteUser = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC deleteUser @userId = :userId",
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`);
    }
};


/**
 * ==== POST RELATED ===================================================================================================
 */
// ==== create post in "posts" table ===================================================================================

exports.createPost = async (token, description, img, tags, link) => {
    if (!token || !img || !tags || !token) return badParameters.errorCode;
    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;

        if(link){
            return await dbModule.query(
                "EXEC insertPost @userId = :userId, @description = :description, @img = :img, @tags = :tags",
                [userId, description, img, tags]
            );
        }else{
            return await dbModule.query(
                "EXEC insertAd @userId = :userId, @description = :description, @img = :img, @tags = :tags, @link = :link",
                [userId, description, img, tags, link]
            );
        }
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service createLike(): ${e}`);
    }
};

// ==== get post from  =================================================================================

exports.getPost = async (token, filter) => {
    if (!token || !filter) return badParameters.errorCode;

};

// ==== delete post in "posts" table ===================================================================================

exports.deletePost = async (token, postId) => {
    if (!token || !postId) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC deletePost @idPost = :postId",
            [postId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteLike(): ${e}`);
    }
};


/**
 * ==== LIKES RELATED ==================================================================================================
 */
// ==== create like in "likes" table ===================================================================================

exports.createLike = async (token, postId) => {
    if (!token || !postId) return badParameters.errorCode;
    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;

        return await dbModule.query(
            "EXEC createLike @userId = :userId, @postId = :postId ",
            [userId, postId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service createLike(): ${e}`);
    }
};

// ==== get user info in "users" table =================================================================================

exports.getLike = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC getLike @userId : userId",
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service getUserInfo(): ${e}`);
    }
};

// ==== delete like in "likes" table ===================================================================================

exports.deleteLike = async (token, idLikes) => {
    if (!token || !idLikes) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC deleteLike @idLikes = :idLikes",
            [idLikes]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service deleteLike(): ${e}`);
    }
};

/**
 * ==== TAGS RELATED ===================================================================================================
 */
// ==== get Tags info in "categories" table ======================================================================

exports.getTags = async (token) => {
    if (!token) return badParameters.errorCode;

    try {
        const userId = await dbModule.query(
            `EXEC getUserIdbyToken @token = :token`,
            [token]
        );

        if (userId.length) return uniqueViolation.errorCode;
        return await dbModule.query(
            "EXEC getTags @userId = :userId",
            [userId]
        );
    } catch (e) {
        console.log(`[${Date()}]\n[ERROR] Database Service getUserInfo(): ${e}`);
    }
};