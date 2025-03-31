let currentIndex = null; 

document.getElementById('AddOrderForm').addEventListener('submit', function (event) {
    event.preventDefault();

   
    const customerName = document.getElementById('CustomerName').value;
    const orderDate = document.getElementById('Orderdate').value;
    const productName = document.getElementById('ProductName').value;
    const total = document.getElementById('Total').innerText.replace('$', ''); 
    const quantity = parseInt(document.getElementById('Quantity').value); 
    const orderDescription = document.getElementById('Orderdescription').value || 'N/A';

    
    if (!customerName || !orderDate || !productName || !total || !quantity || quantity <= 0) {
        alert('Please fill in all required fields.');
        return;
    }

    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    
    let productIndex = products.findIndex(product => product.name === productName);

    if (productIndex === -1) {
        alert("Product not found.");
        return;
    }

    
    if (products[productIndex].quantity < quantity) {
        alert("Not enough stock available.");
        return;
    }

    
    products[productIndex].quantity -= quantity;

    
    localStorage.setItem('products', JSON.stringify(products));

    
    const order = {
        name: customerName,
        date: orderDate,
        proname: productName,
        total: `$${total}`, 
        quantity: quantity, 
        description: orderDescription,
    };

    
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    
    if (currentIndex !== null) {
        orders[currentIndex] = order;
        currentIndex = null;
    } else {
        orders.push(order);
    }

    
    localStorage.setItem('orders', JSON.stringify(orders));

    
    loadOrders();
    fetchProduct(); 

    
    document.getElementById('AddOrderForm').reset();
    document.getElementById('ItemPrice').innerHTML = '';
    document.getElementById('Total').innerHTML = '';
});


function editOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let order = orders[index];

    
    document.getElementById('CustomerName').value = order.name;
    document.getElementById('Orderdate').value = order.date;
    document.getElementById('ProductName').value = order.proname;
    document.getElementById('Quantity').value = order.quantity; 
    document.getElementById('Total').innerText = order.total; 
    document.getElementById('Orderdescription').value = order.description;

    currentIndex = index;
}


function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    
    if (confirm('Are you sure you want to delete this order?')) {
        orders.splice(index, 1); 
        localStorage.setItem('orders', JSON.stringify(orders)); 
        loadOrders(); 
    }
}


document.addEventListener('DOMContentLoaded', loadOrders);


function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('OrdersList');
    tableBody.innerHTML = ''; 

    orders.forEach((order, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${order.name}</td>
            <td>${order.date}</td>
            <td>${order.proname}</td>
            <td>${order.quantity}</td> <!-- Show Quantity -->
            <td>${order.total}</td>
            <td>${order.description}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editOrder(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}

function fetchProduct() {
   
    const products = JSON.parse(localStorage.getItem("products")) || [];
    
    
    const productSelect = document.getElementById('ProductName');
    
    
    productSelect.innerHTML = '<option value="">Select a product</option>';
    
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name; 
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}


document.getElementById('ProductName').addEventListener('change', updateTotal);
document.getElementById('Quantity').addEventListener('input', updateTotal);

function updateTotal() {
    const productName = document.getElementById('ProductName').value;
    const quantity = document.getElementById('Quantity').value;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    
    const selectedProduct = products.find(product => product.name === productName);
    
    if (selectedProduct && quantity) {
        
        document.getElementById('ItemPrice').textContent = `$${selectedProduct.price}`; 
    
        
        const total = (parseFloat(selectedProduct.price) * parseInt(quantity)).toFixed(2);
    
        
        document.getElementById('Total').textContent = `$${total}`;
        
    } else {
        
        document.getElementById('ItemPrice').textContent = `$0`;
        document.getElementById('Total').textContent = `$0`;
    }
}




document.addEventListener('DOMContentLoaded', function () {
    fetchProduct(); 
});
