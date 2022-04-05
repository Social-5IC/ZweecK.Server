const dbModule = require("./database/db-module");
const {
  badParameters,
  uniqueViolation,
} = require("../specification/error-cases");
const { verify, generate } = require("password-hash");

/**
 * ==== AUTH RELATED ===================================================================================================
 */
// ==== start session in "session" =====================================================================================

exports.logIn = async (mail, password) => {
  if (!mail || !password) return badParameters.errorCode;

  try {
    //si verifica solo l'esistenza della mail (la tabella ha la constraint UNIQUE sulla colonna mail)
    const infoUs = await dbModule.query(
      ``, //TODO ottiene id utente e la password in base alla mail
      [mail]
    );
    if (verify(password, infoUs["password"])) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO restituisce il token in base allo userId
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
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO chiude la sessione
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
  username,
  mail,
  password,
  name,
  surname,
  dob,
  sex
) => {
  if (!username || !mail || !password || !name || !surname || !dob || !sex)
    return badParameters.errorCode;
  try {
    const userId = await dbModule.query(
      ``, //TODO restituisce lo userId in base alla mail
      [mail]
    );
    let passCript = generate(password);
    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO inserisce un nuovo utente e ritorna il token
      [username, mail, passCript, name, surname, dob, sex]
    );
  } catch (e) {
    console.log(`[${Date()}]\n[ERROR] Database Service createUser(): ${e}`);
  }
};

// ==== get user info in "users" table =================================================================================

exports.getUserInfo = async (token) => {
  if (!token) return badParameters.errorCode;

  try {
    //si recupere l'id dalla tabella session(idToken, idUtente, Token)
    const userId = await dbModule.query(
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO recupera le informazioni dello User
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
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO disattiva/cancella tutto cio che è legato allo User
      [userId]
    );
  } catch (e) {
    console.log(`[${Date()}]\n[ERROR] Database Service deleteUser(): ${e}`);
  }
};

/**
 * ==== LIKES RELATED ==================================================================================================
 */
// ==== create like in "likes" table ===================================================================================

exports.createLike = async (token, idPost) => {
  if (!token || !idPost) return badParameters.errorCode;
  try {
    const userId = await dbModule.query(
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;

    //TODO controlla se esiste gia il like ( input: UserId, PostId)

    return await dbModule.query(
      "", //TODO inserisce un nuovo like
      [userId, idPost]
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
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO recupera tutti gli id dei like e dei post associati
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
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO disattiva/cancella il like
      [idLikes]
    );
  } catch (e) {
    console.log(`[${Date()}]\n[ERROR] Database Service deleteLike(): ${e}`);
  }
};

/**
 * ==== CATEGORIES RELATED =============================================================================================
 */
// ==== get categories info in "categories" table ======================================================================

exports.getCategories = async (token) => {
  if (!token) return badParameters.errorCode;

  try {
    const userId = await dbModule.query(
      ``, //TODO restituisce lo userId in base al token
      [token]
    );

    if (userId.length) return uniqueViolation.errorCode;
    return await dbModule.query(
      "", //TODO recupera tutte le categorie
      [userId]
    );
  } catch (e) {
    console.log(`[${Date()}]\n[ERROR] Database Service getUserInfo(): ${e}`);
  }
};
