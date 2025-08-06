// Chart setup
        const ctx = document.getElementById('leaveChart').getContext('2d');
        const leaveChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Annual Leave',
                        borderColor: 'blue',
                        data: [5, 3, 6, 8, 4, 7],
                        fill: false,
                    },
                    {
                        label: 'Sick Leave',
                        borderColor: 'red',
                        data: [2, 5, 3, 10, 6, 2],
                        fill: false,
                    },
                    {
                        label: 'Other Leave',
                        borderColor: 'green',
                        data: [1, 0, 2, 1, 3, 0],
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });

        // ✅ UPDATED TAB FUNCTIONALITY - matches candidates page logic
        document.addEventListener("DOMContentLoaded", () => {
            const tabBtns = document.querySelectorAll(".tab-btn");

            // Tab functionality
            function openTab(evt, tabName) {
                // Hide all tab content
                const tabContents = document.querySelectorAll(".tab-content");
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                // Remove active class from all tab buttons
                tabBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked tab
                evt.currentTarget.classList.add('active');
                
                // Show selected tab content
                document.getElementById(tabName).classList.add('active');
                
                console.log(`Switched to ${tabName} tab`);
            }

            // Attach click event listeners to tab buttons
            tabBtns.forEach(btn => {
                btn.addEventListener('click', (evt) => {
                    const tabName = btn.getAttribute('data-tab');
                    openTab(evt, tabName);
                });
            });

            console.log("✅ Dashboard tabs initialized successfully");
        });