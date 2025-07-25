// Search filtering
const searchInput = document.querySelector('.directory-search');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        document.querySelectorAll('.employee-table tbody tr').forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(searchValue) ? '' : 'none';
        });
    });
}

// Pagination toggle
const paginationBtns = document.querySelectorAll('.pagination-btn');
paginationBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        paginationBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Profile Viewer Logic
function showProfile(name, role, email) {
    document.getElementById('employee-directory-section').style.display = 'none';
    document.querySelector('.profile-info h2').textContent = name;
    document.querySelector('.profile-info p:nth-child(2)').textContent = role;
    document.querySelector('.profile-info p:nth-child(3)').textContent = email;
    document.querySelector('.profile').style.display = 'block';
    document.getElementById('back-to-directory').style.display = 'block';
}

function showDirectory() {
    document.querySelector('.profile').style.display = 'none';
    document.getElementById('employee-directory-section').style.display = 'block';
    document.getElementById('back-to-directory').style.display = 'none';
}
