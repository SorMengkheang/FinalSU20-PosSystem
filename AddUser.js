document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    document.getElementById('addUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const gender = document.getElementById('gender').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const status = document.getElementById('status').value;

        const newUser = {
            id: userId,
            username: username,
            email: email,
            gender: gender,
            phone: phone,
            address: address,
            status: status
        };

        
        if (document.getElementById('addUserForm').dataset.editingId) {
            updateUser(newUser); 
            delete document.getElementById('addUserForm').dataset.editingId; 
        } else {
            saveUser(newUser); 
        }

        loadUsers();
        document.getElementById('addUserForm').reset();
        document.querySelector('#addUserForm button[type="submit"]').textContent = 'Add User'; 
    });
});

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.phone || '-'}</td>
            <td>${user.address || '-'}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function editUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToEdit = users.find(user => user.id === userId);

    if (userToEdit) {
        
        document.getElementById('userId').value = userToEdit.id;
        document.getElementById('username').value = userToEdit.username;
        document.getElementById('email').value = userToEdit.email;
        document.getElementById('gender').value = userToEdit.gender;
        document.getElementById('phone').value = userToEdit.phone;
        document.getElementById('address').value = userToEdit.address;
        document.getElementById('status').value = userToEdit.status;

        
        const addButton = document.querySelector('#addUserForm button[type="submit"]');
        addButton.textContent = 'Update User';

       
        document.getElementById('addUserForm').dataset.editingId = userId;
    }
}

function updateUser(userToEdit) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
        if (user.id === userToEdit.id) {
            return {
                id: document.getElementById('userId').value,
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                gender: document.getElementById('gender').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                status: document.getElementById('status').value
            };
        }
        return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers();

    
    document.getElementById('addUserForm').reset();
    const addButton = document.querySelector('#addUserForm button[type="submit"]');
    addButton.textContent = 'Add User';
    addButton.onclick = function(event) {
        event.preventDefault();

        document.getElementById('addUserForm').dispatchEvent(new Event('submit'));
    };
}