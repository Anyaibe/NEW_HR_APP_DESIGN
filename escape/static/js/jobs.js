document.addEventListener('DOMContentLoaded', function() {
    // Find the "Add new Job" button
    const addJobBtn = Array.from(document.querySelectorAll('.add-btn')).find(btn => 
        btn.textContent.includes('Add new Job')
    );
    const modal = document.getElementById('add-job-modal');
    const form = document.getElementById('add-job-form');
    const fileInput = document.getElementById('job-description-file');
    const fileUploadBox = document.getElementById('file-upload-box');
    const fileName = document.getElementById('file-name');

    // Open modal when "Add new Job" button is clicked
    if (addJobBtn && modal) {
        addJobBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
        });
    }

    // File upload handling
    if (fileUploadBox && fileInput) {
        fileUploadBox.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = `Selected: ${file.name}`;
                fileUploadBox.style.borderColor = '#0585B8';
                fileUploadBox.style.backgroundColor = '#f0f8ff';
            } else {
                fileName.textContent = '';
                fileUploadBox.style.borderColor = '#ccc';
                fileUploadBox.style.backgroundColor = 'transparent';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const jobData = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                jobData[key] = value;
            }

            console.log('Job Data:', jobData);
            
            // Here you would typically send the data to your server
            alert('Job posted successfully!');
            
            // Close modal and reset form
            modal.classList.add('hidden');
            form.reset();
            fileName.textContent = '';
            fileUploadBox.style.borderColor = '#ccc';
            fileUploadBox.style.backgroundColor = 'transparent';
        });
    }

    // Close modal functionality
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('hidden');
            form.reset();
            if (fileName) fileName.textContent = '';
            if (fileUploadBox) {
                fileUploadBox.style.borderColor = '#ccc';
                fileUploadBox.style.backgroundColor = 'transparent';
            }
        });
    });

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                form.reset();
                if (fileName) fileName.textContent = '';
                if (fileUploadBox) {
                    fileUploadBox.style.borderColor = '#ccc';
                    fileUploadBox.style.backgroundColor = 'transparent';
                }
            }
        });
    }

    console.log('✅ Add Job modal functionality loaded');
});