document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.clickable-row');
    const directorySection = document.getElementById('employee-directory-section');
    const profileSection = document.querySelector('.profile');
    const backButton = document.getElementById('back-to-directory');

    // Sample employee data (in a real app, this would come from your backend)
    const employeeData = {
        'Ali Balogun': {
            personal: {
                employeeId: 'Ali',
                firstName: 'Ali',
                lastName: 'Balogun',
                mobileNumber: '(702) 555-0122',
                emailAddress: 'ali@gmail.com',
                dateOfBirth: 'July 14, 1999',
                maritalStatus: 'Married',
                gender: 'Male',
                nationality: 'Nigerian',
                homeAddress: '426 Adebayo Adedeji, Utako',
                city: 'Utako',
                state: 'Abuja State'
            },
            professional: {
                employeeType: 'Part-Time',
                companyEmail: 'ali@escapetech.net',
                department: 'Support and Logistic',
                designation: 'Depart Head',
                workingDays: '5 days',
                workingHours: '9:00am - 6:00pm',
                joinDate: '12-34-456',
                contractDuration: '1 year',
                officeAddress: '426 Adebayo Adedeji, Utako'
            },
            leaveHistory: [
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'pending' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'approved' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' },
                { date: '13/01', leaveType: 'Sick Leave', from: '14/03', to: '14/03', status: 'rejected' }
            ]
        },
        'Aisha Doe': {
            personal: {
                employeeId: '001',
                firstName: 'Aisha',
                lastName: 'Doe',
                mobileNumber: '(555) 123-4567',
                emailAddress: 'aisha@company.com',
                dateOfBirth: 'March 15, 1990',
                maritalStatus: 'Single',
                gender: 'Female',
                nationality: 'Nigerian',
                homeAddress: '123 Main Street',
                city: 'Lagos',
                state: 'Lagos State'
            },
            professional: {
                employeeType: 'Full-Time',
                companyEmail: 'aisha@company.com',
                department: 'Human Resources',
                designation: 'HR Manager',
                workingDays: 'Mon - Fri',
                workingHours: '8:00am - 5:00pm',
                joinDate: '01-15-2020',
                contractDuration: 'Permanent',
                officeAddress: '456 Business District'
            },
            leaveHistory: [
                { date: '12/01', leaveType: 'Annual Leave', from: '20/03', to: '25/03', status: 'approved' },
                { date: '10/01', leaveType: 'Sick Leave', from: '15/02', to: '16/02', status: 'approved' }
            ]
        }
    };

    // Handle row click to show profile
    rows.forEach(row => {
        row.addEventListener('click', function (e) {
            e.stopPropagation();
            
            const name = row.getAttribute('data-name');
            const role = row.getAttribute('data-role');
            const email = row.getAttribute('data-email');
            const profileImage = row.getAttribute('data-image') || '{% static "images/default-avatar.png" %}';

            // Update profile header
            updateProfileHeader(name, role, email, profileImage);
            
            // Update profile data
            updateProfileData(name);
            
            // Switch to profile view (this will reset to defaults)
            switchToProfile();
        });
    });

    function updateProfileHeader(name, role, email, image) {
        const profileNameElement = document.getElementById('profile-name');
        const profileRoleElement = document.getElementById('profile-role');
        const profileEmailElement = document.getElementById('profile-email');
        const profileImageElement = document.getElementById('profile-image');

        if (profileNameElement) profileNameElement.textContent = name || 'N/A';
        if (profileRoleElement) profileRoleElement.textContent = role || 'N/A';
        if (profileEmailElement) profileEmailElement.textContent = email || 'N/A';
        if (profileImageElement) profileImageElement.src = image;
    }

    function updateProfileData(employeeName) {
        const employee = employeeData[employeeName];
        
        if (!employee) {
            console.warn(`No data found for employee: ${employeeName}`);
            return;
        }

        // Update personal information
        const personalInfo = employee.personal;
        updateElementText('employee-id', personalInfo.employeeId);
        updateElementText('first-name', personalInfo.firstName);
        updateElementText('last-name', personalInfo.lastName);
        updateElementText('mobile-number', personalInfo.mobileNumber);
        updateElementText('email-address', personalInfo.emailAddress);
        updateElementText('date-of-birth', personalInfo.dateOfBirth);
        updateElementText('marital-status', personalInfo.maritalStatus);
        updateElementText('gender', personalInfo.gender);
        updateElementText('nationality', personalInfo.nationality);
        updateElementText('home-address', personalInfo.homeAddress);
        updateElementText('city', personalInfo.city);
        updateElementText('state', personalInfo.state);

        // Update professional information
        const professionalInfo = employee.professional;
        updateElementText('employee-type', professionalInfo.employeeType);
        updateElementText('company-email', professionalInfo.companyEmail);
        updateElementText('department', professionalInfo.department);
        updateElementText('designation', professionalInfo.designation);
        updateElementText('working-days', professionalInfo.workingDays);
        updateElementText('working-hours', professionalInfo.workingHours);
        updateElementText('join-date', professionalInfo.joinDate);
        updateElementText('contract-duration', professionalInfo.contractDuration);
        updateElementText('office-address', professionalInfo.officeAddress);

        // Update leave history
        updateLeaveHistory(employee.leaveHistory);
    }

    function updateElementText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text || '-';
        }
    }

    function updateLeaveHistory(leaveHistory) {
        const tbody = document.getElementById('leave-history-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        leaveHistory.forEach(leave => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leave.date}</td>
                <td>${leave.leaveType}</td>
                <td>${leave.from}</td>
                <td>${leave.to}</td>
                <td><span class="leave-status ${leave.status}">${leave.status}</span></td>
                <td><button class="action-btn">⋯</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // ✅ FIXED: Reset to default state when switching to profile
    function switchToProfile() {
        if (directorySection) directorySection.classList.add('hidden');
        if (profileSection) profileSection.classList.remove('hidden');
        
        // Reset to default state: Profile tab active, Personal info active
        resetToDefaultProfileState();
    }

    // ✅ NEW: Function to reset profile to default state
    function resetToDefaultProfileState() {
        // Reset profile navigation to Profile tab
        const profileNavBtns = document.querySelectorAll('.profile-nav-btn');
        profileNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === 'profile-tab') {
                btn.classList.add('active');
            }
        });

        // Reset info tabs to Personal Information
        const infoTabBtns = document.querySelectorAll('.info-tab-btn');
        infoTabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-info-tab') === 'personal-info') {
                btn.classList.add('active');
            }
        });

        // Show Profile tab content and hide Leave tab
        switchProfileTab('profile-tab');
        
        // Show Personal Information and hide Professional Information
        switchInfoTab('personal-info');
    }

    // Profile navigation handling
    const profileNavBtns = document.querySelectorAll('.profile-nav-btn');
    profileNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchProfileTab(tabId);
            
            // Update active state
            profileNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Info tabs handling
    const infoTabBtns = document.querySelectorAll('.info-tab-btn');
    infoTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-info-tab');
            switchInfoTab(tabId);
            
            // Update active state
            infoTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function switchProfileTab(tabId) {
        // Hide all profile tab contents
        const allTabs = document.querySelectorAll('.profile-tab-content');
        allTabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    function switchInfoTab(tabId) {
        // Hide all info contents
        const allInfoContents = document.querySelectorAll('.info-content');
        allInfoContents.forEach(content => content.classList.remove('active'));
        
        // Show selected info content
        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    }

    // ✅ FIXED: Back to Directory button - also reset profile state
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            showDirectory();
        });
    }

    // ✅ FIXED: Function to show directory - now also resets profile state for next time
    window.showDirectory = function() {
        if (profileSection) profileSection.classList.add('hidden');
        if (directorySection) directorySection.classList.remove('hidden');
        
        // Reset profile to default state for next time user clicks on an employee
        resetToDefaultProfileState();
    };

    // Leave sort functionality
    const leaveSortSelect = document.getElementById('leave-sort');
    if (leaveSortSelect) {
        leaveSortSelect.addEventListener('change', function() {
            // Add sorting logic here if needed
            console.log('Sort by:', this.value);
        });
    }

    // Search filter (existing code)
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

    // Pagination (existing code)
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Modal logic for Add Employee (existing code)
    const addEmployeeBtn = Array.from(document.querySelectorAll('.directory-controls .filter-btn')).find(btn => btn.textContent.includes('Add'));
    const modal = document.getElementById('add-employee-modal');
    const tabPersonal = document.getElementById('tab-personal');
    const tabProfessional = document.getElementById('tab-professional');
    const personalSection = document.getElementById('personal-section');
    const professionalSection = document.getElementById('professional-section');
    const nextBtn = document.getElementById('next-btn');

    if (addEmployeeBtn && modal) {
        addEmployeeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
        });

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

        // Next button validation
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
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    console.log('✅ Enhanced employee_directory.js loaded');
});