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

// ==== POST new user ==================================================================================================
app.post("/auth", async (req, res) => {
  const queryResult = await dbService.logIn(
    req.get("mail"),
    req.get("password")
  );

  switch (queryResult) {
    case undefined:
      res.status(500).json({ error: internalError.description });
      break;
    case badParameters.errorCode:
      res.status(400).json({ error: badParameters.description });
      break;
    case uniqueViolation.errorCode:
      res.status(406).json({ error: uniqueViolation.description });
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

// ==== POST new user ==================================================================================================
app.delete("/auth", async (req, res) => {
  const queryResult = await dbService.logOut(req.get("token"));

  switch (queryResult) {
    case undefined:
      res.status(500).json({ error: internalError.description });
      break;
    case badParameters.errorCode:
      res.status(400).json({ error: badParameters.description });
      break;
    case uniqueViolation.errorCode:
      res.status(406).json({ error: uniqueViolation.description });
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

// ==== Starting the server ============================================================================================
app.listen(port, () => {
  console.log("==== Server running ==================================");
});
