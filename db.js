const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/winamp"
);

module.exports.addUser = (first, last, email, password) => {
    const q = `
    INSERT INTO users (first, last, email, password)
    values ($1, $2, $3, $4)  
    RETURNING id 
    `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUser = (userEmail) => {
    return db.query(`SELECT * FROM users WHERE email=$1`, [userEmail]);
};
