function toggleDropdown(dropdownId) {
    const menu = document.getElementById(dropdownId);
    const button = document.querySelector(`[onclick*="${dropdownId}"]`);
    const arrow = button.querySelector('.dropdown-arrow');
    
    // Only toggle if we're manually clicking, not if it's already shown due to active state
    if (!menu.classList.contains('show')) {
        menu.classList.add('show');
        arrow.classList.add('rotated');
    } else {
        menu.classList.remove('show');
        arrow.classList.remove('rotated');
    }
    
    console.log(`Dropdown ${dropdownId} toggled. Classes:`, menu.className);
}

// Handle dropdown state based on current page
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle Employees dropdown
    const employeeDropdown = document.getElementById("employeeDropdown");
    if (employeeDropdown) {
        const employeeDropdownLinks = employeeDropdown.querySelectorAll('a');
        const employeeDropbtn = document.querySelector('[onclick*="employeeDropdown"]');
        const employeeArrow = employeeDropbtn.querySelector('.dropdown-arrow');
        
        // Check if we're on an employee-related page
        let isOnEmployeePage = false;
        employeeDropdownLinks.forEach(link => {
            if (link.classList.contains('active')) {
                isOnEmployeePage = true;
            }
        });
        
        // If we're on an employee page, show dropdown, highlight parent, and rotate arrow
        if (isOnEmployeePage && employeeDropbtn) {
            employeeDropdown.classList.add('show');
            employeeDropbtn.classList.add('active');
            employeeArrow.classList.add('rotated');
        }
    }

    // Handle Recruitment dropdown
    const recruitmentDropdown = document.getElementById("recruitmentDropdown");
    if (recruitmentDropdown) {
        const recruitmentDropdownLinks = recruitmentDropdown.querySelectorAll('a');
        const recruitmentDropbtn = document.querySelector('[onclick*="recruitmentDropdown"]');
        const recruitmentArrow = recruitmentDropbtn.querySelector('.dropdown-arrow');
        
        // Check if we're on a recruitment-related page
        let isOnRecruitmentPage = false;
        recruitmentDropdownLinks.forEach(link => {
            if (link.classList.contains('active')) {
                isOnRecruitmentPage = true;
            }
        });
        
        // If we're on a recruitment page, show dropdown, highlight parent, and rotate arrow
        if (isOnRecruitmentPage && recruitmentDropbtn) {
            recruitmentDropdown.classList.add('show');
            recruitmentDropbtn.classList.add('active');
            recruitmentArrow.classList.add('rotated');
        }
    }

    // Close other dropdowns when one is opened (optional feature)
    const allDropdownButtons = document.querySelectorAll('.dropbtn');
    allDropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const clickedDropdownId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Close other dropdowns
            const allDropdowns = document.querySelectorAll('.dropdown-content');
            allDropdowns.forEach(dropdown => {
                if (dropdown.id !== clickedDropdownId && !dropdown.querySelector('a.active')) {
                    dropdown.classList.remove('show');
                    // Also rotate back the arrow
                    const otherButton = document.querySelector(`[onclick*="${dropdown.id}"]`);
                    const otherArrow = otherButton.querySelector('.dropdown-arrow');
                    otherArrow.classList.remove('rotated');
                }
            });
        });
    });
});