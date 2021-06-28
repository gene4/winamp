const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("../db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("../bcrypt");
const csurf = require("csurf");

///////////////////////////
//////// MIDDLEWARE //////
/////////////////////////

const secret =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;

app.use(
    cookieSession({
        secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: "strict",
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

///////////////////////////
//////// Routes //////
/////////////////////////

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register", (req, res) => {
    console.log("req.body", req.body);
    hash(req.body.password)
        .then((hashedPw) => {
            console.log("hashedPwd in /register", hashedPw);
            db.addUser(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                hashedPw
            )
                .then((result) => {
                    console.log(result);
                    req.session.userId = result.rows[0].id;
                    console.log(req.session);
                    res.json(result.rows);
                })
                .catch((e) => {
                    console.log(e);
                    res.json({ success: false });
                });
        })
        .catch((err) => console.log("err in hash:", err));
});

app.post("/login", (req, res) => {
    db.getUser(req.body.email)
        .then((result) => {
            if (!req.body.email) {
                console.log("cant find email");
                res.json({ success: false });
            } else {
                let hashFromDb = result.rows[0].password;
                compare(req.body.password, hashFromDb)
                    .then((match) => {
                        if (match) {
                            req.session.userId = result.rows[0].id;
                            console.log("match password", req.session);
                            res.json({ success: true });
                        } else {
                            console.log("password didnt match");
                            res.json({ success: false });
                        }
                    })
                    .catch((e) => {
                        console.log("cant find password", e);
                        res.json({ success: false });
                    });
            }
        })
        .catch((e) => {
            console.log("cant find email", e);
            res.json({ success: false });
        });
});

app.get("/playlist/:id", function (req, res) {
    db.getPlaylist(req.params.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log("error in getting playlist", e);
            res.json({ success: false });
        });
});

app.post("/insert/track", function (req, res) {
    db.insertTrack(
        req.body.trackId,
        req.body.user,
        req.body.title,
        req.body.duration,
        req.body.artwork_url,
        req.body.permalink_url,
        req.body.userId
    )
        .then((result) => {
            res.json({
                platlist: result.rows[0],
                success: true,
            });
        })
        .catch((e) => {
            console.log("error in inserting track", e);
            res.json({ success: false });
        });
});

app.post("/delete/track", function (req, res) {
    console.log("req.body in get delete track", req.body);
    db.deleteTrack(req.body.trackId, req.session.userId)
        .then((result) => {
            console.log("deleted track", result.rows);
            res.json({ success: true });
        })
        .catch((e) => {
            console.log("error in getting playlist", e);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
