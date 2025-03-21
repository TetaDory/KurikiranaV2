$(document).ready(function() {
    // Array to store food items
    var foodItems =;
  
    // Function to add a new food item
    function addItem(name, description) {
      const newItem = {
        id: Date.now(), // Generate a unique ID
        name: name,
        description: description
      };
      foodItems.push(newItem);
      renderItems();
    }
  
    // Function to edit an existing food item
    function editItem(id, name, description) {
      const itemIndex = foodItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        foodItems[itemIndex] = { id, name, description };
        renderItems();
      }
    }
  
    // Function to delete a food item
    function deleteItem(id) {
      foodItems = foodItems.filter(item => item.id !== id);
      renderItems();
    }
  
    // Function to render the food items list
    function renderItems() {
      const foodItemsList = $("#foodItemsList");
      foodItemsList.empty(); // Clear the list
  
      foodItems.forEach(item => {
        const listItem = $("<li>");
        listItem.html(`
          ${item.name} - ${item.description}
          <button class="edit-btn" data-item-id="${item.id}">Edit</button>
          <button class="delete-btn" data-item-id="${item.id}">Delete</button>
        `);
        foodItemsList.append(listItem);
      });
    }
  
    // Add item
    $("#addItemBtn").click(function() {
      $("#addItemModal").show();
    });
  
    $("#addItemForm").submit(function(event) {
      event.preventDefault();
      const name = $("#itemName").val();
      const description = $("#itemDescription").val();
      addItem(name, description);
      $("#addItemModal").hide();
      $("#addItemForm")[0].reset(); // Clear the form
    });
  
    // Edit item
    $("#foodItemsList").on("click", ".edit-btn", function() {
      const itemId = $(this).data("item-id");
      const item = foodItems.find(item => item.id === itemId);
      $("#editItemName").val(item.name);
      $("#editItemDescription").val(item.description);
      $("#editItemModal").show();
  
      // Update the item when the edit form is submitted
      $("#editItemForm").submit(function(event) {
        event.preventDefault();
        const name = $("#editItemName").val();
        const description = $("#editItemDescription").val();
        editItem(itemId, name, description);
        $("#editItemModal").hide();
        $("#editItemForm")[0].reset(); // Clear the form
      });
    });
  
    // Delete item
    $("#foodItemsList").on("click", ".delete-btn", function() {
      const itemId = $(this).data("item-id");
      $("#deleteItemModal").show();
  
      $("#confirmDeleteBtn").click(function() {
        deleteItem(itemId);
        $("#deleteItemModal").hide();
      });
    });
  
    // Close modals
    $(".close-btn").click(function() {
      $(this).closest(".modal").hide();
    });
  });