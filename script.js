let currentIndex = null; 
let products = JSON.parse(localStorage.getItem('products'));

function showAddProduct() {
    document.getElementById("addProductSection").classList.remove("d-none");
    document.getElementById("productListSection").classList.add("d-none");
    resetForm();
}

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

   
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;

    
    if (!productName || !productPrice || !productQuantity || !productCategory) {
        alert('Please fill in all required fields.');
        return;
    }

    
    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        category: productCategory,
        description: productDescription || 'N/A',
    };

    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (currentIndex !== null) {
        
        products[currentIndex] = product;
        currentIndex = null; 
    } else {
        
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));

    
    loadProducts();

    
    document.getElementById('addProductForm').reset();
    document.getElementById("addProductSection").classList.add("d-none");
    document.getElementById("productListSection").classList.remove("d-none");
});


function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('productList');
    tableBody.innerHTML = ''; 

    products.forEach((product, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td> 
                <button class="btn btn-primary btn-sm" onclick="editProduct(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}


function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products[index];
    
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description;
    
    currentIndex = index; 
    showAddProduct();
}


function deleteProduct(index) {
    
    let products = JSON.parse(localStorage.getItem('products')) || [];

    
    if (index >= 0 && index < products.length) {
        products.splice(index, 1);  
        localStorage.setItem('products', JSON.stringify(products)); 
        loadProducts();  
    } else {
        console.error("Invalid product index:", index);
    }
}


function loadingDetail() {
    const productCategory = document.getElementById("productCategory");
    if (!productCategory) {
        console.error("Dropdown element 'productCategory' not found.");
        return;
    }

    
    productCategory.innerHTML = '<option value="">Select a category</option>';

    
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    if (!Array.isArray(categories)) {
        console.error("Categories data is not an array.");
        categories = [];
    }

    console.log("Loaded categories:", categories);

    
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        productCategory.appendChild(option);
    });
}



document.addEventListener('DOMContentLoaded', loadingDetail);


document.addEventListener('DOMContentLoaded', loadingDetail);


window.onload = loadProducts;

function updateDashboardStats() {
    // Select elements by ID
    const productCard = document.getElementById("product-count");
    const categoryCard = document.getElementById("category-count");
    const orderCard = document.getElementById("order-count");
    const userCard = document.getElementById("user-count");

    // Retrieve data from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Update the dashboard values
    if (productCard) productCard.innerText = products.length;
    if (categoryCard) categoryCard.innerText = categories.length;
    if (orderCard) orderCard.innerText = orders.length;
    if (userCard) userCard.innerText = users.length;
}

// Ensure the function runs after the page loads
document.addEventListener("DOMContentLoaded", updateDashboardStats);

