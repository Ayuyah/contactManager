document.addEventListener('DOMContentLoaded', loadContacts);
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    const contact = { name, email, phone };
    
    if (editingIndex !== null) {
      updateContact(editingIndex, contact);
      editingIndex = null;
    } else {
      addContact(contact);
      saveContact(contact);
    }

    document.getElementById('contact-form').reset();
  }
});

let editingIndex = null;

function addContact(contact) {
  const contactList = document.getElementById('contact-list');
  const contactItem = document.createElement('li');

  const contactDetails = document.createElement('span');
  contactDetails.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
  contactItem.appendChild(contactDetails);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    editContact(contact);
  });
  contactItem.appendChild(editButton);

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

function editContact(contact) {
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('phone').value = contact.phone;

  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  editingIndex = contacts.findIndex(c => c.email === contact.email);
}

function updateContact(index, updatedContact) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts[index] = updatedContact;
  localStorage.setItem('contacts', JSON.stringify(contacts));

  document.getElementById('contact-list').innerHTML = '';
  contacts.forEach(contact => addContact(contact));
}

