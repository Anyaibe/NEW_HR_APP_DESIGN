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

// Tab switcher
function openTab(event, tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}