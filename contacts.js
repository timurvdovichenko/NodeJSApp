// contacts.js
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

// const contactsPath = './db/contacts.json';
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код. Возвращает массив контактов.
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null если объект с таким id не найден.
  const contacts = await listContacts();
  const data = contacts.find(({ id }) => id === contactId);
  return data || null;
}

async function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null если объект с таким id не найден.

  const contacts = await listContacts();
  const indexContact = contacts.findIndex(({ id }) => id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const removedContact = contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact || null;
}

async function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта. Возвращает null если объект с таким id не найден.
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact || null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
