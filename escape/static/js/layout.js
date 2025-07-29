function toggleDropdown() {
    const menu = document.getElementById("employeeDropdown");
    const dropbtn = document.querySelector('.dropbtn');
    
    // Toggle the dropdown visibility
    menu.classList.toggle("show");
}

// Handle dropdown state based on current page
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById("employeeDropdown");
    const dropdownLinks = dropdown.querySelectorAll('a');
    const dropbtn = document.querySelector('.dropbtn');
    
    // Check if we're on an employee-related page
    let isOnEmployeePage = false;
    dropdownLinks.forEach(link => {
        if (link.classList.contains('active')) {
            isOnEmployeePage = true;
        }
    });
    
    // If we're on an employee page, show dropdown and highlight parent
    if (isOnEmployeePage) {
        dropdown.classList.add('show');
        dropbtn.classList.add('active');
    } else {
        // If we're on any other page (like dashboard), collapse the dropdown
        dropdown.classList.remove('show');
        dropbtn.classList.remove('active');
    }
    
    // Handle clicks on dropdown links
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            // The navigation will happen automatically via href
            // The page will reload and the DOMContentLoaded will handle the new state
        });
    });
});