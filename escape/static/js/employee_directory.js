document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.clickable-row');
    const directorySection = document.getElementById('employee-directory-section');
    const profileSection = document.querySelector('.profile');
    const backButton = document.getElementById('back-to-directory');

    // Handle row click to show profile
    rows.forEach(row => {
        row.addEventListener('click', function (e) {
            // Prevent any other click handlers from interfering
            e.stopPropagation();
            
            const name = row.getAttribute('data-name');
            const role = row.getAttribute('data-role');
            const email = row.getAttribute('data-email');
            const profileImage = row.getAttribute('data-image') || '{% static "images/default-avatar.png" %}';

            // Fill in profile details
            const profileNameElement = document.querySelector('.profile-info h2');
            const profileRoleElement = document.querySelector('.profile-info p:nth-child(2)');
            const profileEmailElement = document.querySelector('.profile-info p:nth-child(3)');
            const profileImageElement = document.getElementById('profile-image');

            if (profileNameElement) profileNameElement.textContent = name || 'N/A';
            if (profileRoleElement) profileRoleElement.textContent = role || 'N/A';
            if (profileEmailElement) profileEmailElement.textContent = email || 'N/A';
            if (profileImageElement) profileImageElement.src = profileImage;

            // Switch views
            if (directorySection) directorySection.classList.add('hidden');
            if (profileSection) profileSection.classList.remove('hidden');
        });
    });

    // Back to Directory button
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            showDirectory();
        });
    }

    // Function to show directory (can be called from anywhere)
    window.showDirectory = function() {
        if (profileSection) profileSection.classList.add('hidden');
        if (directorySection) directorySection.classList.remove('hidden');
    };

    // Search filter
    const searchInput = document.querySelector('.directory-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.employee-table tbody tr');
            tableRows.forEach(row => {
                const rowText = row.innerText.toLowerCase();
                row.style.display = rowText.includes(searchValue) ? '' : 'none';
            });
        });
    }

    // Pagination button highlight
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    console.log('✅ employee_directory.js loaded');

    // Modal logic for Add Employee
    const addEmployeeBtn = Array.from(document.querySelectorAll('.directory-controls .filter-btn')).find(btn => btn.textContent.includes('Add'));
    const modal = document.getElementById('add-employee-modal');
    const tabPersonal = document.getElementById('tab-personal');
    const tabProfessional = document.getElementById('tab-professional');
    const personalSection = document.getElementById('personal-section');
    const professionalSection = document.getElementById('professional-section');
    const nextBtn = document.getElementById('next-btn');

    // Show modal
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
        });
    }

    // Tab switching
    if (tabPersonal) {
        tabPersonal.addEventListener('click', () => {
            tabPersonal.classList.add('active');
            tabProfessional.classList.remove('active');
            personalSection.classList.add('active');
            professionalSection.classList.remove('active');
        });
    }

    if (tabProfessional) {
        tabProfessional.addEventListener('click', () => {
            tabProfessional.classList.add('active');
            tabPersonal.classList.remove('active');
            professionalSection.classList.add('active');
            personalSection.classList.remove('active');
        });
    }

    // Validation before switching tab
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const inputs = personalSection.querySelectorAll('input, select');
            for (let input of inputs) {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    return;
                }
            }
            tabProfessional.click();
        });
    }

    // Cancel button logic
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('hidden');
        });
    });

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
});