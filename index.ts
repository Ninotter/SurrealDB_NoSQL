import Express from "express";
import { config } from "dotenv";
import { initDB } from "./connexion";
import db from "./connexion";
import csv from 'csvtojson';
config();
initDB();
const app = Express();
app.use(Express.json());

app.get("/", (req, res) => {
    res.send("pong");
});

app.post("/create", async (req, res) => {
    const table = req.body.table;
    const data = req.body.data;
    if(!table || !data){
        res.send("Missing table or data");
        return;
    }
    try {
        const created = await db.create(table, data);
        res.send(created);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}); 

app.get("/read/:id", async (req, res) => {
    const id = req.params.id;
    const table = id.split(":")[0];
    try {
        const read = await db.query("select * from type::table($tb) where id = $idread", { tb : table, idread : id });
        res.send(read);
    } catch (err) {
        console.log(err);
    }
});

app.put("/update/:id", async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    if(!id || !data){
        res.send("Missing table or data");
        return;
    }
    try {
        const updated = await db.update(id, data);
        res.send(updated);
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.delete(id);
        res.send("done");
    } catch (err) {
        res.status(500).send("error");
        console.log(err);
    }
});

app.get("/fillcsv", async (req, res) => {
    const jsonObj = await csv().fromFile('contacts.csv');
    try{
        jsonObj.forEach(element => {
            db.create("contacts", element);
        });
    }
    catch(error){
        console.log(error);
    }
    console.log("done");
    res.status(200).send("done");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});