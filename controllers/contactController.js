const mongodb = require("../database");
const { ObjectId } = require("mongodb");

const db = process.env.DATABASE_NAME
const collection = process.env.CONTACTS_COLLECTION


async function getAll(req, res) {
    try {
        const client = mongodb.getClient();
        const contactList = await client.db(db).collection(collection).find().toArray();
        
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contactList);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Error fetching contacts" });
    }
}

async function getByID(req ,res) {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        
        const _id = new ObjectId(req.params.id);
        const client = mongodb.getClient();
        const contact = await client.db(db).collection(collection).findOne({ _id });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ message: "Error fetching contact" });
    }
}


module.exports = {
    getAll,
    getByID
}