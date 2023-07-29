const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.log('allContacts :>> ', allContacts);

    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.log(`contact by ID ${id} is :>>`, contactById);

    case 'remove':
      const contactToRemove = await contacts.removeContact(id);
      return console.log(`contact with ID ${id} removed :>>`, contactToRemove);

    case 'add':
      const contactsAdd = await contacts.addContact(name, email, phone);

      return console.log(`contact with ID ${name}, ${email}, ${phone} add :>>`, contactsAdd);

    default:
      return console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
