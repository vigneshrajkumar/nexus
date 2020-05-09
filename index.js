const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


app.get("/contacts", async (req, res) => {
    try {
        const resp = await pool.query("SELECT id, name, email FROM nex.contact ORDER BY name")
        res.json(resp.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/contacts/:id", async (req, res) => {
    try {
        const resp = await pool.query("SELECT id, name, email FROM nex.contact WHERE id = $1",
            [req.params.id]
        )
        res.json(resp.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.put("/contacts/:id", async (req, res) => {
    try {
        const resp = await pool.query("UPDATE nex.contact SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
            [req.body.name, req.body.email, req.params.id]
        )
        res.json(resp.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.delete("/contacts/:id", async (req, res) => {
    try {
        const resp = await pool.query("DELETE FROM nex.contact WHERE id = $1",
            [req.params.id]
        )
        res.json(resp.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/contacts", async (req, res) => {
    try {
        const resp = await pool.query("INSERT INTO nex.contact (name, email) VALUES ($1, $2) RETURNING id, name, email",
            [req.body.name, req.body.email]
        )
        res.json(resp.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(5000, () => {
    console.log("server @ 5K");
})