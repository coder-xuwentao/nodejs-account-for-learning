module.exports = {
    environment: "dev",
    database: {
        dbName: "boblog",
        host: "localhost",
        port: 3306,
        user: "root",
        password: "asd123",
    },
    security: {
        secretKey: "secretKey",
        expiresIn: 60 * 60,
    },
};
