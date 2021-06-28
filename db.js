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

module.exports.getPlaylist = (userId) => {
    const q = `
    SELECT *  FROM tracks
      WHERE userId = $1
      ORDER BY tracks.id DESC
    `;

    const params = [userId];
    return db.query(q, params);
};

module.exports.insertTrack = (
    trackId,
    username,
    title,
    duration,
    artwork_url,
    permalink_url,
    userId
) => {
    const q = `
    INSERT INTO tracks (track_id, username, title, duration, artwork_url, permalink_url, userid)
    values ($1, $2, $3 , $4 , $5 , $6 , $7 )
    RETURNING track_id, username, title, duration, artwork_url, permalink_url, userId
    `;

    const params = [
        trackId,
        username,
        title,
        duration,
        artwork_url,
        permalink_url,
        userId,
    ];
    return db.query(q, params);
};

module.exports.deleteTrack = (trackId, userId) => {
    const q = `
    DELETE FROM tracks WHERE (track_id = $1 AND userId = $2)`;
    const params = [trackId, userId];
    return db.query(q, params);
};
