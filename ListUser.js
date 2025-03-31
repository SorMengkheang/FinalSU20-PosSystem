document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

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
        document.getElementById('editId').value = userToEdit.id;
        document.getElementById('editUsername').value = userToEdit.username;
        document.getElementById('editEmail').value = userToEdit.email;
        document.getElementById('editGender').value = userToEdit.gender;
        document.getElementById('editPhone').value = userToEdit.phone;
        document.getElementById('editAddress').value = userToEdit.address;
        document.getElementById('editStatus').value = userToEdit.status;

        document.getElementById('editPopup').style.display = 'block';

        document.getElementById('editForm').onsubmit = function(event) {
            event.preventDefault();
            updateUser(userToEdit);
        };

        document.getElementById('closePopup').onclick = function() {
            document.getElementById('editPopup').style.display = 'none';
        };
    }
}

function updateUser(userToEdit) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
        if (user.id === userToEdit.id) {
            return {
                id: document.getElementById('editId').value,
                username: document.getElementById('editUsername').value,
                email: document.getElementById('editEmail').value,
                gender: document.getElementById('editGender').value,
                phone: document.getElementById('editPhone').value,
                address: document.getElementById('editAddress').value,
                status: document.getElementById('editStatus').value
            };
        }
        return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers();
    document.getElementById('editPopup').style.display = 'none';
}