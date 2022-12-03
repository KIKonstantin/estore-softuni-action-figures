const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    return jwt({
        secret: "shhhhhhared-secret",
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            "/users/login",
            "/users/register",
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;