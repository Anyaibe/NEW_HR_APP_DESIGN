document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".tab-btn");

    // Sample leave data with different statuses (more data for pagination demo)
    const leaveData = [
        { id: "001", employee: "Aisha Doe", leaveType: "Sick Leave", from: "14/05", to: "16/05", status: "pending" },
        { id: "002", employee: "Chukwudemezi", leaveType: "Annual Leave", from: "11/05", to: "19/05", status: "approved" },
        { id: "003", employee: "Salemaan", leaveType: "Compassionate Leave", from: "01/02", to: "02/02", status: "rejected" },
        { id: "004", employee: "Olamide", leaveType: "Annual", from: "23/06", to: "29/06", status: "cancelled" },
        { id: "005", employee: "Sesman", leaveType: "Annual", from: "17/06", to: "25/06", status: "completed" },
        { id: "006", employee: "John Smith", leaveType: "Sick Leave", from: "20/05", to: "22/05", status: "pending" },
        { id: "007", employee: "Mary Johnson", leaveType: "Maternity Leave", from: "01/06", to: "30/08", status: "approved" },
        { id: "008", employee: "David Wilson", leaveType: "Annual Leave", from: "15/07", to: "25/07", status: "rejected" },
        { id: "009", employee: "Sarah Lee", leaveType: "Sick Leave", from: "10/05", to: "12/05", status: "pending" },
        { id: "010", employee: "Michael Brown", leaveType: "Annual Leave", from: "05/08", to: "15/08", status: "completed" },
        { id: "011", employee: "Emma Davis", leaveType: "Sick Leave", from: "22/07", to: "24/07", status: "pending" },
        { id: "012", employee: "James Miller", leaveType: "Annual Leave", from: "10/09", to: "20/09", status: "approved" },
        { id: "013", employee: "Lisa Wilson", leaveType: "Maternity Leave", from: "01/08", to: "31/10", status: "approved" },
        { id: "014", employee: "Robert Garcia", leaveType: "Sick Leave", from: "15/06", to: "17/06", status: "rejected" },
        { id: "015", employee: "Jennifer Martinez", leaveType: "Annual Leave", from: "25/08", to: "05/09", status: "pending" },
        { id: "016", employee: "William Rodriguez", leaveType: "Compassionate Leave", from: "03/07", to: "05/07", status: "completed" },
        { id: "017", employee: "Elizabeth Lopez", leaveType: "Sick Leave", from: "18/09", to: "20/09", status: "approved" },
        { id: "018", employee: "Christopher Hernandez", leaveType: "Annual Leave", from: "12/10", to: "22/10", status: "pending" },
        { id: "019", employee: "Jessica Gonzalez", leaveType: "Maternity Leave", from: "01/09", to: "30/11", status: "rejected" },
        { id: "020", employee: "Daniel Anderson", leaveType: "Sick Leave", from: "28/08", to: "30/08", status: "completed" },
        // Adding more data for better pagination demo
        { id: "021", employee: "Amanda White", leaveType: "Annual Leave", from: "12/11", to: "19/11", status: "pending" },
        { id: "022", employee: "Kevin Thompson", leaveType: "Sick Leave", from: "05/12", to: "07/12", status: "approved" },
        { id: "023", employee: "Rachel Green", leaveType: "Maternity Leave", from: "01/10", to: "31/12", status: "approved" },
        { id: "024", employee: "Brian Clark", leaveType: "Annual Leave", from: "20/11", to: "30/11", status: "rejected" },
        { id: "025", employee: "Sophie Turner", leaveType: "Sick Leave", from: "15/12", to: "17/12", status: "pending" }
    ];

    // Pagination settings
    const ITEMS_PER_PAGE = 8;
    let currentPages = {
        all: 1,
        pending: 1,
        approved: 1,
        rejected: 1
    };

    // Function to get status display name
    function getStatusDisplayName(status) {
        switch(status) {
            case 'pending': return 'Pending';
            case 'approved': return 'Approved';
            case 'rejected': return 'Rejected';
            case 'cancelled': return 'Cancelled';
            case 'completed': return 'Completed';
            default: return status;
        }
    }

    // Function to filter data based on tab
    function getFilteredData(filter) {
        if (filter === 'all') return leaveData;
        
        return leaveData.filter(leave => {
            switch(filter) {
                case 'pending':
                    return leave.status === 'pending';
                case 'approved':
                    return leave.status === 'approved' || leave.status === 'completed';
                case 'rejected':
                    return leave.status === 'rejected' || leave.status === 'cancelled';
                default:
                    return true;
            }
        });
    }

    // Function to render leave requests with pagination
    function renderLeaveRequests(filter = 'all', page = 1) {
        const activeTabContent = document.getElementById(filter);
        if (!activeTabContent) {
            console.error(`Tab content for ${filter} not found`);
            return;
        }
        
        const tableBody = activeTabContent.querySelector("table tbody");
        if (!tableBody) {
            console.error(`Table body for ${filter} not found`);
            return;
        }
        
        tableBody.innerHTML = "";

        // Get filtered data
        const filteredData = getFilteredData(filter);
        
        // Calculate pagination
        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        console.log(`Rendering ${paginatedData.length} items for ${filter} tab (page ${page})`);

        // Render paginated leave requests
        paginatedData.forEach(leave => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leave.id}</td>
                <td>${leave.employee}</td>
                <td>${leave.leaveType}</td>
                <td>${leave.from}</td>
                <td>${leave.to}</td>
                <td><span class="status ${leave.status}">${getStatusDisplayName(leave.status)}</span></td>
                <td><button class="action-btn">...</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Update pagination controls
        updatePaginationControls(filter, page, totalPages);
    }

    // Function to update pagination controls
    function updatePaginationControls(filter, currentPage, totalPages) {
        const paginationContainer = document.querySelector(`#${filter} .pagination`);
        if (!paginationContainer) return;

        const prevBtn = paginationContainer.querySelector(`#${filter}-prev`);
        const nextBtn = paginationContainer.querySelector(`#${filter}-next`);
        const pageButtons = paginationContainer.querySelectorAll('.pagination-btn[data-page]');

        // Update previous button
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        }

        // Update next button
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        }

        // Update page buttons
        pageButtons.forEach(btn => {
            const page = parseInt(btn.getAttribute('data-page'));
            btn.classList.toggle('active', page === currentPage);
            
            // Hide page buttons that exceed total pages
            if (page <= totalPages) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    // Function to handle pagination clicks
    function setupPagination() {
        document.querySelectorAll('.pagination').forEach(paginationContainer => {
            const tabContent = paginationContainer.closest('.tab-content');
            const filter = tabContent.id;

            paginationContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('pagination-btn')) {
                    const btn = e.target;
                    
                    if (btn.id === `${filter}-prev`) {
                        // Previous button
                        if (currentPages[filter] > 1) {
                            currentPages[filter]--;
                            renderLeaveRequests(filter, currentPages[filter]);
                        }
                    } else if (btn.id === `${filter}-next`) {
                        // Next button
                        const filteredData = getFilteredData(filter);
                        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
                        if (currentPages[filter] < totalPages) {
                            currentPages[filter]++;
                            renderLeaveRequests(filter, currentPages[filter]);
                        }
                    } else if (btn.hasAttribute('data-page')) {
                        // Page number button
                        const page = parseInt(btn.getAttribute('data-page'));
                        currentPages[filter] = page;
                        renderLeaveRequests(filter, currentPages[filter]);
                    }
                }
            });
        });
    }

    // Tab functionality
    function openTab(evt, tabName) {
        console.log(`Opening tab: ${tabName}`);
        
        // Hide all tab contents
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = "none";
        });

        // Remove active class from all tab buttons
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked tab
        evt.currentTarget.classList.add('active');
        
        // Show the current tab content
        const activeTabContent = document.getElementById(tabName);
        if (activeTabContent) {
            activeTabContent.style.display = "block";
            activeTabContent.classList.add('active');
        }
        
        // Reset to page 1 when switching tabs
        currentPages[tabName] = 1;
        
        // Filter and render leave requests based on selected tab
        renderLeaveRequests(tabName, 1);
    }

    // Attach click event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (evt) => {
            evt.preventDefault();
            
            let tabName;
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/'([^']+)'/);
                tabName = match ? match[1] : btn.textContent.toLowerCase().trim();
            } else {
                tabName = btn.textContent.toLowerCase().trim();
            }
            
            console.log(`Tab clicked: ${tabName}`);
            openTab(evt, tabName);
        });
    });

    // Make openTab function globally available for HTML onclick attributes (fallback)
    window.openTab = openTab;

    // Initialize pagination
    setupPagination();

    // Initialize with all leave requests and set first tab as active
    console.log("Initializing leave directory...");
    renderLeaveRequests('all', 1);
    
    // Ensure the first tab is active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
    
    // Show the 'all' tab content
    const allTabContent = document.getElementById("all");
    if (allTabContent) {
        allTabContent.style.display = "block";
        allTabContent.classList.add('active');
    }

    console.log("✅ Leave directory page initialized with pagination");
});