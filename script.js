document.addEventListener('DOMContentLoaded', loadContacts);
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    const contact = { name, email, phone };
    addContact(contact);
    saveContact(contact);
    document.getElementById('contact-form').reset();
  }
});

function addContact(contact) {
  const contactList = document.getElementById('contact-list');
  const contactItem = document.createElement('li');

  const contactDetails = document.createElement('span');
  contactDetails.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
  contactItem.appendChild(contactDetails);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    contactList.removeChild(contactItem);
    deleteContact(contact);
  });
  contactItem.appendChild(deleteButton);

  contactList.appendChild(contactItem);
}

function saveContact(contact) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts() {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.forEach(contact => addContact(contact));
}

function deleteContact(contact) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts = contacts.filter(c => c.email !== contact.email);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
