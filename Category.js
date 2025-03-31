let currentIndex = null; 
document.getElementById('AddCategoryForm').addEventListener('submit', function (event) {
    event.preventDefault();

   
    const CategoryName = document.getElementById('CategoryName').value.trim();
    const CategoryNumber = document.getElementById('CategoryNumber').value.trim();
    const Limit = document.getElementById('Limit').value.trim();
    const Available = document.getElementById('Available').value;
    const CategoryDescription = document.getElementById('CategoryDescription').value.trim();

    
    if (!CategoryName || !CategoryNumber || !Limit || !Available) {
        alert('Please fill in all required fields.');
        return;
    }

    
    const Category = {
        name: CategoryName,
        number: CategoryNumber,
        limit: Limit,
        available: Available,
        description: CategoryDescription || 'N/A',
    };

    
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    if (currentIndex !== null) {
        
        categories[currentIndex] = Category;
        currentIndex = null; 
    } else {
        
        categories.push(Category);
    }

    
    localStorage.setItem('categories', JSON.stringify(categories));

    
    loadCategories();

    
    document.getElementById('AddCategoryForm').reset();
});


function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const tableBody = document.getElementById('CategoryList');
    tableBody.innerHTML = '';

    categories.forEach((category, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${category.name}</td>
            <td>${category.number}</td>
            <td>${category.limit}</td>
            <td>${category.available}</td>
            <td>${category.description}</td>
            <td> 
                <button class="btn btn-primary btn-sm" onclick="editCategory(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}


function editCategory(index) {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const category = categories[index];

    
    document.getElementById('CategoryName').value = category.name;
    document.getElementById('CategoryNumber').value = category.number;
    document.getElementById('Limit').value = category.limit;
    document.getElementById('Available').value = category.available;
    document.getElementById('CategoryDescription').value = category.description;

    currentIndex = index;
}


function deleteCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories'));
    categories.splice(index, 1); 
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories(); 
}


window.onload = loadCategories;
