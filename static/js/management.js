$(document).ready(function() {
    // Array to store locations
    var locations =;
  
    // Function to add a new food facility
    function addfacility(name, description) {
      const newfacility = {
        id: Date.now(), // Generate a unique ID
        name: name,
        description: description
      };
      locations.push(newfacility);
      renderfacilities();
    }
  
    // Function to edit an existing food facility
    function editfacility(id, name, description) {
      const facilityIndex = locations.findIndex(facility => facility.id === id);
      if (facilityIndex !== -1) {
        locations[facilityIndex] = { id, name, description };
        renderfacilities();
      }
    }
  
    // Function to delete a food facility
    function deletefacility(id) {
      locations = locations.filter(facility => facility.id !== id);
      renderfacilitiess();
    }
  
    // Function to render the food facilities list
    function renderfacilities() {
      const locationsList = $("#locationsList");
      locationsList.empty(); // Clear the list
  
      locations.forEach(facility => {
        const listfacility = $("<li>");
        listfacility.html(`
          ${facility.name} - ${facility.description}
          <button class="edit-btn" data-facility-id="${facility.id}">Edit</button>
          <button class="delete-btn" data-facility-id="${facility.id}">Delete</button>
        `);
        locationsList.append(listfacility);
      });
    }
  
    // Add facility
    $("#addfacilityBtn").click(function() {
      $("#addfacilityModal").show();
    });
  
    $("#addfacilityForm").submit(function(event) {
      event.preventDefault();
      const name = $("#facilityName").val();
      const description = $("#facilityDescription").val();
      addfacility(name, description);
      $("#addfacilityModal").hide();
      $("#addfacilityForm")[0].reset(); // Clear the form
    });
  
    // Edit facility
    $("#locationsList").on("click", ".edit-btn", function() {
      const facilityId = $(this).data("facility-id");
      const facility = locations.find(facility => facility.id === facilityId);
      $("#editfacilityName").val(facility.name);
      $("#editfacilityDescription").val(facility.description);
      $("#editfacilityModal").show();
  
      // Update the facility when the edit form is submitted
      $("#editfacilityForm").submit(function(event) {
        event.preventDefault();
        const name = $("#editfacilityName").val();
        const description = $("#editfacilityDescription").val();
        editfacility(facilityId, name, description);
        $("#editfacilityModal").hide();
        $("#editfacilityForm")[0].reset(); // Clear the form
      });
    });
  
    // Delete facility
    $("#locationsList").on("click", ".delete-btn", function() {
      const facilityId = $(this).data("facility-id");
      $("#deletefacilityModal").show();
  
      $("#confirmDeleteBtn").click(function() {
        deletefacility(facilityId);
        $("#deletefacilityModal").hide();
      });
    });
  
    // Close modals
    $(".close-btn").click(function() {
      $(this).closest(".modal").hide();
    });
  });