document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    if (addProductForm) {
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productQuantity = document.getElementById('productQuantity').value;
            const productCategory = document.getElementById('productCategory').value;
            const productDescription = document.getElementById('productDescription').value;

            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${productName}</td>
                <td>${productPrice}</td>
                <td>${productQuantity}</td>
                <td>${productCategory}</td>
                <td>${productDescription}</td>
                <td>
                    <button class="btn btn-primary btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </td>
            `;

            
            productList.appendChild(newRow);

           
            addProductForm.reset();
        });
    }
});

function populateCategoryDropdown() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let categorySelect = document.getElementById('editCategory'); 

   
    categorySelect.innerHTML = '';

   
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a Category --';
    categorySelect.appendChild(defaultOption);

    
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}


document.addEventListener("DOMContentLoaded", populateCategoryDropdown);


