document.addEventListener("DOMContentLoaded", function() {
    let categories = JSON.parse(localStorage.getItem('categories')) || []; 
    console.log(categories);
    
    const categoryList = document.getElementById("CategoryList"); 
    
    
    categoryList.innerHTML = '';
    

categories.forEach((category, index) => {
    let row = categoryList.insertRow();

    let cellName = row.insertCell();
    cellName.textContent = category.name;
    cellName.style.padding = "8px";
    cellName.style.textAlign = "center";

    let cellNumber = row.insertCell();
    cellNumber.textContent = category.number;
    cellNumber.style.padding = "8px";
    cellNumber.style.textAlign = "center";

    let cellLimit = row.insertCell();
    cellLimit.textContent = category.limit;
    cellLimit.style.padding = "8px";
    cellLimit.style.textAlign = "center";

    let cellAvailable = row.insertCell();
    cellAvailable.textContent = category.available === "Instock" ? "Instock" : "Outstock";  
    cellAvailable.style.padding = "8px";
    cellAvailable.style.textAlign = "center";

    let cellDescription = row.insertCell();
    cellDescription.textContent = category.description || "N/A";
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
        editCategory(index);  
    };
    
    
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "#f44336";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.cursor = "pointer";
    deleteButton.onclick = function() {
        deleteCategory(index); 
    };

    
    cellActions.appendChild(editButton);
    cellActions.appendChild(deleteButton);
    
    
    row.style.backgroundColor = row.rowIndex % 2 === 0 ? "#f2f2f2" : "white";
});

});


// Edit category function
function editCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let category = categories[index];
    
    // Populate the edit form with the selected category details
    document.getElementById('editName').value = category.name;
    document.getElementById('editCategoryNumber').value = category.number;
    document.getElementById('editPreorderLimit').value = category.limit;
    document.getElementById('editAvailable').value = category.available === "Instock" ? "Instock" : "Outstock";  // Use Instock or Outstock
    document.getElementById('editDescription').value = category.description || "N/A";
    
    // Display the popup
    document.getElementById('editPopup').style.display = 'block';

    // Handle form submission
    document.getElementById('editForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Get updated values from the form
        categories[index].name = document.getElementById('editName').value;
        categories[index].number = document.getElementById('editCategoryNumber').value;
        categories[index].limit = document.getElementById('editPreorderLimit').value;
        categories[index].available = document.getElementById('editAvailable').value === "Instock" ? "Instock" : "Outstock";  // Save as Instock or Outstock
        categories[index].description = document.getElementById('editDescription').value;
        
        // Save updated category list to localStorage
        localStorage.setItem('categories', JSON.stringify(categories));

        // Reload the page to update the table
        location.reload();
    };

    // Close the popup when cancel button is clicked
    document.getElementById('closePopup').onclick = function() {
        document.getElementById('editPopup').style.display = 'none';
    };
}


// Delete category function
function deleteCategory(index) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.splice(index, 1);  // Remove the category at the given index
    localStorage.setItem('categories', JSON.stringify(categories));  // Save updated categories to localStorage
    location.reload();  // Reload the page to reflect changes
}
