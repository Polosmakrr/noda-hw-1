const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function getDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function listContacts() {
  return await getDb();
}

async function getContactById(contactId) {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
}

async function addContact(name, email, phone) {
  const id = uuidv4();
  const contact = { id: id, name: name, email: email, phone: phone };
  const db = await getDb();
  const updateDb = [...db, contact];
  await fs.writeFile(contactsPath, JSON.stringify(updateDb));
  return contact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
