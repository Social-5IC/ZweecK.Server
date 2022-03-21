// ==== Databases service error cases ==================================================================================

exports.internalError = {
    "errorCode": 0,
    "description": "internal server error"
}

exports.badParameters = {
    "errorCode": 1,
    "description": "wrong parameters schema"
}

exports.uniqueViolation = {
    "errorCode": 2,
    "description": "entity already exists"
}
