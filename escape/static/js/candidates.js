document.addEventListener("DOMContentLoaded", () => {
            const candidateRows = document.querySelectorAll(".candidates-table tbody tr");
            const candidateDetails = document.getElementById("candidate-details");
            const closeBtn = document.getElementById("close-btn");
            const candidateNameElement = document.querySelector(".role h4");
            const candidateRoleElement = document.querySelector(".role p");

            candidateRows.forEach(row => {
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
        });