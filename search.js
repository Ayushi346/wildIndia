document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const speciesDetails = document.getElementById('speciesDetails');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const specieNameInput = document.getElementById('specieName');
        const specieName = specieNameInput.value.trim();

        try {
            // Perform input validation
            if (specieName === '') {
                throw new Error('Species name cannot be empty');
            }

            const url = `/search-specie?specie_name=${encodeURIComponent(specieName)}`;
            console.log('Fetching:', url); // Log the URL being fetched for debugging

            const response = await fetch(url);

            if (response.ok) {
                const speciesData = await response.json();
                displayResults(speciesData); // Assuming displayResults is a function to render results
            } else {
                throw new Error(`Failed to fetch species (${response.status} ${response.statusText})`);
            }
        } catch (error) {
            console.error('Error fetching species:', error);
            // Display error message to the user
            speciesDetails.innerHTML = `<p>Failed to fetch species data. Please try again later.</p>`;
        }
    });

    function displayResults(data) {
        // Clear previous results
        speciesDetails.innerHTML = '';

        // Display results
        if (data.length > 0) {
            data.forEach(species => {
                const speciesElement = document.createElement('div');
                speciesElement.classList.add('species-item');
                speciesElement.innerHTML = `
                    <h2>${species.specie_name}</h2>
                    <p><strong>Sanctuary:</strong> ${species.sanctuary}</p>
                    <p><strong>Location:</strong> ${species.location}</p>
                    <p><strong>Status:</strong> ${species.status}</p>
                `;
                speciesDetails.appendChild(speciesElement);
            });
        } else {
            speciesDetails.innerHTML = '<p>No species found.</p>';
        }
    }
});
