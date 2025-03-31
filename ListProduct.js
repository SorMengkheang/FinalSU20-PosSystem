document.addEventListener("DOMContentLoaded", function() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products);
    
    const productText = document.getElementById("product-Showing"); 
    
    
    productText.innerHTML = '';
    
    
    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse"; 
    
    
    let headerRow = table.insertRow();
    let headers = ["Name", "Price", "Quantity", "Category", "Description", "Actions"];
    
    headers.forEach(header => {
        let cell = headerRow.insertCell();
        cell.textContent = header;
        cell.style.backgroundColor = "#2196f3";
        cell.style.color = "white";
        cell.style.padding = "8px";
        cell.style.textAlign = "center";
        cell.style.fontWeight = "bold";
    });

    
    products.forEach((product, index) => {
        let row = table.insertRow();
        
        let cellName = row.insertCell();
        cellName.textContent = product.name;
        cellName.style.padding = "8px";
        cellName.style.textAlign = "center";

        let cellPrice = row.insertCell();
        cellPrice.textContent = product.price;
        cellPrice.style.padding = "8px";
        cellPrice.style.textAlign = "center";

        let cellQuantity = row.insertCell();
        cellQuantity.textContent = product.quantity;
        cellQuantity.style.padding = "8px";
        cellQuantity.style.textAlign = "center";

        let cellCategory = row.insertCell();
        cellCategory.textContent = product.category;
        cellCategory.style.padding = "8px";
        cellCategory.style.textAlign = "center";

        let cellDescription = row.insertCell();
        cellDescription.textContent = product.description || "N/A";
        cellDescription.style.padding = "8px";
        cellDescription.style.textAlign = "center";
        
        
        let cellActions = row.insertCell();
        cellActions.style.textAlign = "center";
        cellActions.style.padding = "8px";
        
        
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.backgroundColor = "#2196f3";
        editButton.style.color = "white";
        editButton.style.border = "none";
        editButton.style.padding = "5px 10px";
        editButton.style.margin = "0 5px";
        editButton.style.cursor = "pointer";
        editButton.onclick = function() {
            editProduct(index); 
        };
        
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "#f44336";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.cursor = "pointer";
        deleteButton.onclick = function() {
            deleteProduct(index);  
        };

       
        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
        
        
        row.style.backgroundColor = row.rowIndex % 2 === 0 ? "#f2f2f2" : "white";
    });

    
    productText.appendChild(table);
});


function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products[index];
    
    
    document.getElementById('editName').value = product.name;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editQuantity').value = product.quantity;
    document.getElementById('editCategory').value = product.category;
    document.getElementById('editDescription').value = product.description || "N/A";
    
    
    document.getElementById('editPopup').style.display = 'block';

    
    document.getElementById('editForm').onsubmit = function(e) {
        e.preventDefault();
        
        
        products[index].name = document.getElementById('editName').value;
        products[index].price = document.getElementById('editPrice').value;
        products[index].quantity = document.getElementById('editQuantity').value;
        products[index].category = document.getElementById('editCategory').value;
        products[index].description = document.getElementById('editDescription').value;
        
        
        localStorage.setItem('products', JSON.stringify(products));

       
        location.reload();
    };

    
    document.getElementById('closePopup').onclick = function() {
        document.getElementById('editPopup').style.display = 'none';
    };
}



function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);  
    localStorage.setItem('products', JSON.stringify(products)); 
}
