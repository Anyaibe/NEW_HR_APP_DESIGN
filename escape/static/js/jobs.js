document.addEventListener('DOMContentLoaded', function() {
    // Find the "Add new Job" button
    const addJobBtn = Array.from(document.querySelectorAll('.add-btn')).find(btn => 
        btn.textContent.includes('Add new Job')
    );
    
    // Get clickable job cards and sections
    const jobCards = document.querySelectorAll('.clickable-div');
    const jobDetailSection = document.querySelector('.job-details');
    const jobSection = document.getElementById('job-directory-section');
    const modal = document.getElementById('add-job-modal');
    const form = document.getElementById('add-job-form');
    const fileInput = document.getElementById('job-description-file');
    const fileUploadBox = document.getElementById('file-upload-box');
    const fileName = document.getElementById('file-name');

    // Handle Job Card Click to show Job Details Section
    jobCards.forEach(card => {
        card.addEventListener('click', function (e){
            e.stopPropagation();

            const role = card.getAttribute("data-role");
            const location = card.getAttribute("data-location");
            const experience = card.getAttribute("data-exp");
            const jobImage = card.getAttribute('data-image') || '/static/images/avatar.svg';
            
            // Determine if card is open or closed based on classes
            const isOpen = card.classList.contains('card-opened');
            const isClosed = card.classList.contains('card-closed');

            // Update Job Details Header
            updateJobDetailsHeader(role, location, experience, jobImage, isOpen, isClosed);

            // Switch to Job Details View
            switchToJobDetails();
        });
    });

function updateJobDetailsHeader(role, location, experience, jobImage, isOpen, isClosed){
    const jobRoleElement = document.getElementById("job-name");
    const jobLocationElement = document.getElementById("job-location");
    const jobExperienceElement = document.getElementById("job-experience");
    const jobImageElement = document.getElementById('job-image');

    if (jobRoleElement) jobRoleElement.textContent = role || 'N/A';
    if (jobLocationElement) jobLocationElement.textContent = location || 'N/A';
    if (jobExperienceElement) jobExperienceElement.textContent = experience || 'N/A';
    if (jobImageElement) jobImageElement.src = jobImage;

    // Find the second job-requirements div which contains the status
    const jobRequirementsDivs = document.querySelectorAll('.job-requirements');
    if (jobRequirementsDivs.length >= 2) {
        const secondJobRequirementsDiv = jobRequirementsDivs[1];
        
        // Clear existing content and create proper structure
        secondJobRequirementsDiv.innerHTML = '';
        
        // Create status container div
        const statusContainer = document.createElement('div');
        statusContainer.style.display = 'flex';
        statusContainer.style.alignItems = 'center';
        statusContainer.style.gap = '8px';
        
        // Create status image
        const statusImage = document.createElement('img');
        statusImage.src = '/static/images/status.svg';
        statusImage.alt = 'status';
        statusImage.style.width = '16px';
        statusImage.style.height = '16px';
        statusImage.style.flexShrink = '0';
        
        // Create status text
        const statusText = document.createElement('span');
        statusText.style.fontWeight = '500';
        statusText.style.fontSize = '14px';
        statusText.style.color = '#666';
        
        // Set status based on card type
        if (isOpen) {
            statusText.textContent = 'Open';
            statusText.style.color = '#22c55e';
        } else if (isClosed) {
            statusText.textContent = 'Closed';
            statusText.style.color = '#ef4444';
        } else {
            statusText.textContent = 'Open'; // Default
            statusText.style.color = '#22c55e';
        }
        
        // Add elements to container
        statusContainer.appendChild(statusImage);
        statusContainer.appendChild(statusText);
        
        // Add container to the job requirements div
        secondJobRequirementsDiv.appendChild(statusContainer);
        
        // Apply proper styling to the parent div
        secondJobRequirementsDiv.style.display = 'flex';
        secondJobRequirementsDiv.style.flexDirection = 'column';
        secondJobRequirementsDiv.style.gap = '8px';
    }
}
    
    function switchToJobDetails(){
        if (jobSection) jobSection.classList.add('hidden');
        if (jobDetailSection) jobDetailSection.classList.remove('hidden');
    }

    // Add back button functionality to job details
    const backToJobsBtn = document.getElementById('back-to-jobs');
    if (backToJobsBtn) {
        backToJobsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showJobDirectory();
        });
    }

    function showJobDirectory() {
        if (jobDetailSection) jobDetailSection.classList.add('hidden');
        if (jobSection) jobSection.classList.remove('hidden');
    }

    // Make showJobDirectory available globally in case you need it elsewhere
    window.showJobDirectory = showJobDirectory;

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

    console.log('✅ Add Job modal and job details functionality loaded');
});