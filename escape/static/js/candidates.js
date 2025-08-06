document.addEventListener("DOMContentLoaded", () => {
    const candidateRows = document.querySelectorAll(".candidates-table tbody tr");
    const candidateDetails = document.getElementById("candidate-details");
    const closeBtn = document.getElementById("close-btn");
    const candidateNameElement = document.querySelector(".role h4");
    const candidateRoleElement = document.querySelector(".role p");
    const tabBtns = document.querySelectorAll(".tab-btn");

    // Sample candidate data with different statuses for testing
    const candidateData = [
        { name: "Aisha Doe", role: "Growth Manager", status: "pending", date: "13/01", rating: "4", stage: "Review" },
        { name: "John Smith", role: "Growth Manager", status: "approved", date: "13/01", rating: "4", stage: "Review" },
        { name: "Jane Wilson", role: "Growth Manager", status: "rejected", date: "13/01", rating: "4", stage: "Review" },
        { name: "Mike Johnson", role: "UX Designer", status: "pending", date: "12/01", rating: "5", stage: "Interview" },
        { name: "Sarah Brown", role: "UX Designer", status: "approved", date: "11/01", rating: "4", stage: "HR Review" },
        { name: "David Lee", role: "Financial Analyst", status: "rejected", date: "10/01", rating: "3", stage: "Review" }
    ];

    // Function to render candidates based on filter
    function renderCandidates(filter = 'all') {
        const tableBody = document.querySelector(".candidates-table tbody");
        tableBody.innerHTML = "";

        let filteredData = candidateData;
        
        // Filter data based on selected tab
        if (filter !== 'all') {
            filteredData = candidateData.filter(candidate => {
                if (filter === 'pending') return candidate.status === 'pending';
                if (filter === 'accepted') return candidate.status === 'approved';
                if (filter === 'rejected') return candidate.status === 'rejected';
                return true;
            });
        }

        // Render filtered candidates
        filteredData.forEach(candidate => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${candidate.date}</td>
                <td>${candidate.name}</td>
                <td>${candidate.role}</td>
                <td>${candidate.rating}</td>
                <td>${candidate.stage}</td>
                <td><span class="status ${candidate.status}">${candidate.status === 'approved' ? 'Approved' : candidate.status === 'pending' ? 'Pending' : 'Rejected'}</span></td>
                <td><button>⋯</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Reattach event listeners to new rows
        attachRowEventListeners();
    }

    // Function to attach event listeners to table rows
    function attachRowEventListeners() {
        const rows = document.querySelectorAll(".candidates-table tbody tr");
        rows.forEach(row => {
            row.addEventListener("click", () => {
                const candidateName = row.querySelector("td:nth-child(2)").textContent.trim();
                const appliedRole = row.querySelector("td:nth-child(3)").textContent.trim();
                
                console.log("Clicked candidate:", candidateName, "Role:", appliedRole);
                
                // Update the candidate details with clicked row data
                candidateNameElement.textContent = candidateName;
                candidateRoleElement.textContent = appliedRole;
                
                // Show candidate details panel
                candidateDetails.style.display = "block";
                setTimeout(() => {
                    candidateDetails.classList.add("visible");
                }, 10);
            });
        });
    }

    // Tab functionality
    function openTab(evt, tabName) {
        // Remove active class from all tab buttons
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked tab
        evt.currentTarget.classList.add('active');
        
        // Filter and render candidates based on selected tab
        renderCandidates(tabName);
        
        console.log(`Switched to ${tabName} tab`);
    }

    // Attach click event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (evt) => {
            const tabName = btn.textContent.toLowerCase().trim();
            openTab(evt, tabName);
        });
    });

    // Close candidate details panel
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        candidateDetails.classList.remove("visible");
        setTimeout(() => {
            candidateDetails.style.display = "none";
        }, 300);
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!candidateDetails.contains(e.target) && !e.target.closest(".candidates-table tbody tr")) {
            candidateDetails.classList.remove("visible");
            setTimeout(() => {
                candidateDetails.style.display = "none";
            }, 300);
        }
    });

    // Make openTab function globally available for HTML onclick attributes
    window.openTab = openTab;

    // Initialize with all candidates and set first tab as active
    renderCandidates('all');
    document.querySelector('.tab-btn').classList.add('active');

    console.log("✅ Candidates page initialized with tab filtering");
});