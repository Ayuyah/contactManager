document.getElementById('contact-form').addEventListener('submit',function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  const contactList = document.getElementById('contact-list');
  const contactItem = document.createElement('li');
  const contactDetails = document.createElement('span');
  contactDetails.textContent = `${name} - ${email} - ${phone}`;
  contactItem.appendChild(contactDetails);
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    contactList.removeChild(contactItem);
  });
  contactItem.appendChild(deleteButton);
  contactList.appendChild(contactItem);
  document.getElementById('contact-form').reset();
});