// noinspection JSUnresolvedVariable

const dbService = require("./services/db-service");
const {
    badParameters,
    uniqueViolation,
    internalError,
} = require("./specification/error-cases");

const express = require("express");
const port = 3000;

const app = express();
app.use(express.json());

// ==== LOGIN user =====================================================================================================
app.post("/auth", async (req, res) => {
    const queryResult = await dbService.logIn(
        req.get("mail"),
        req.get("password")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== LOGOUT user ====================================================================================================
app.delete("/auth", async (req, res) => {
    const queryResult = await dbService.logOut(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.status(200);
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});


// ==== POST new user ==================================================================================================
app.post("/user", async (req, res) => {
    const queryResult = await dbService.createUser(
        req.get("name"),
        req.get("surname"),
        req.get("username"),
        req.get("mail"),
        req.get("password"),
        req.get("dob"),
        req.get("sex"),
        req.get("isAdvertiser")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== GET user =======================================================================================================
app.get("/user", async (req, res) => {
    const queryResult = await dbService.getUserInfo(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== DELETE user ====================================================================================================
app.delete("/user", async (req, res) => {
    const queryResult = await dbService.deleteUser(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.status(200);
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});


// ==== POST new post ==================================================================================================
app.post("/post", async (req, res) => {
    const queryResult = await dbService.createPost(
        req.get("token"),
        req.get("description"),
        req.get("img"),
        req.get("tags"),
        req.get("link")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== GET post =======================================================================================================
app.get("/post", async (req, res) => {
    const queryResult = await dbService.getPost(
        req.get("token"),
        req.get("filter")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== delete post ====================================================================================================
app.delete("/post", async (req, res) => {
    const queryResult = await dbService.deletePost(
        req.get("token"),
        req.get("postId")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});


// ==== POST new like ==================================================================================================
app.post("/like", async (req, res) => {
    const queryResult = await dbService.createLike(
        req.get("token"),
        req.get("postId")
    );

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== GET likes ======================================================================================================
app.get("/like", async (req, res) => {
    const queryResult = await dbService.getLike(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== DELETE like ====================================================================================================
app.delete("/like", async (req, res) => {
    const queryResult = await dbService.deleteLike(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.status(200);
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});

// ==== GET likes ======================================================================================================
app.get("/tags", async (req, res) => {
    const queryResult = await dbService.getTags(req.get("token"));

    switch (queryResult) {
        case undefined:
            res.status(500).json({error: internalError.description});
            break;
        case badParameters.errorCode:
            res.status(400).json({error: badParameters.description});
            break;
        case uniqueViolation.errorCode:
            res.status(406).json({error: uniqueViolation.description});
            break;
        default:
            res.json({
                token: queryResult,
            });
            break;
    }

    console.log(
        `
    ==================================================
    ${req.method} ${req.url} HTTP/${req.httpVersion}
    
    Headers:
    ${JSON.stringify(req.headers)}
    
    Requests body:
    ${req.body}
    ==================================================`
    );
});


// ==== Starting the server ============================================================================================
app.listen(port, () => {
    console.log("==== Server running ==================================");
});