document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('api/dashboard/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Limit the data to the first 30 items
            const limitedData = data.slice(0, 50);

            // Extract necessary data for the chart
            const intensityData = limitedData.map(item => item.intensity);
            const years = limitedData.map(item => item.start_year);

            // Your color-coding logic here
            const getColor = (value) => {
                return '#7F00FF'; // Purple color
            };

            const ctx = document.getElementById('intensityChart').getContext('2d');

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Intensity',
                        backgroundColor: intensityData.map(value => getColor(value)),
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: intensityData,
                    }],
                },
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                callback: (value) => value + '%',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to render the Region Doughnut Chart
function renderRegionChart(data) {
    const regionData = data.map(item => item.region);
    const regionCounts = {};
    regionData.forEach(region => {
        regionCounts[region] = (regionCounts[region] || 0) + 1;
    });
    const regionLabels = Object.keys(regionCounts);
    const regionValues = Object.values(regionCounts);

    // Region Doughnut Chart
    var regionCtx = document.getElementById('regionChart').getContext('2d');
    new Chart(regionCtx, {
        type: 'doughnut',
        data: {
            labels: regionLabels,
            datasets: [{
                data: regionValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            aspectRatio: 1,
        },
    });
}

// Fetch data from the API
fetch('api/dashboard/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data from API:', data);

        // Render the Region Doughnut Chart using the fetched data
        renderRegionChart(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Call this function with your data to render the Region Doughnut Chart

function renderLikelihoodChart(data) {
    // Limit the data to the first 30 items
    const limitedData = data.slice(0, 30);

    // Extract necessary data for the chart
    const countriesData = limitedData.map(item => item.country);
    const likelihoodData = limitedData.map(item => item.likelihood);

    // Likelihood Radar Chart
    const likelihoodCtx = document.getElementById('likelihoodChart').getContext('2d');
    new Chart(likelihoodCtx, {
        type: 'radar',
        data: {
            labels: countriesData,
            datasets: [{
                label: 'Likelihood',
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: likelihoodData,
            }],
        },
        options: {
            responsive: true,
            aspectRatio: 1,
        },
    });
}

// Fetch data from the API
fetch('api/dashboard/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data from API:', data);

        // Render the Likelihood Radar Chart using the fetched data
        renderLikelihoodChart(data);
        // ... rest of the code
    })
    .catch(error => console.error('Error fetching data:', error));


   
    function renderRelevanceChart(data) {
        const pestleData = data.map(item => ({ pestle: item.pestle, relevance: item.relevance }));
        const pestleCounts = {};
    
        pestleData.forEach(entry => {
            const { pestle, relevance } = entry;
            if (!pestleCounts[pestle]) {
                pestleCounts[pestle] = { count: 1, totalRelevance: relevance };
            } else {
                pestleCounts[pestle].count += 1;
                pestleCounts[pestle].totalRelevance += relevance;
            }
        });
    
        const pestleLabels = Object.keys(pestleCounts);
        const pestleValues = pestleLabels.map(pestle => {
            const averageRelevance = pestleCounts[pestle].totalRelevance / pestleCounts[pestle].count;
            return averageRelevance.toFixed(2); // You can adjust the precision as needed
        });
    
        // Pie Chart based on Pestle
        var pestleCtx = document.getElementById('relevanceChart').getContext('2d');
        new Chart(pestleCtx, {
            type: 'pie',
            data: {
                labels: pestleLabels,
                datasets: [{
                    label: 'Average Relevance',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        // Add more colors as needed
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)', // White border
                    borderWidth: 1,
                    data: pestleValues,
                }],
            },
            options: {
                responsive: true,
                aspectRatio: 1,
            },
        });
    }
    
    // Assuming you have a similar API call to fetch data
    fetch('api/dashboard/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from API:', data);
    
            // Render the Pie Chart based on Pestle using the fetched data
            renderRelevanceChart(data);
            // ... rest of the code
        })
        .catch(error => console.error('Error fetching data:', error));

        fetch('api/dashboard/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from API:', data);

            // Get unique countries from the data
            const uniqueCountries = [...new Set(data.map(item => item.country))];

            // Populate the dropdown with unique countries
            const dropdown = document.getElementById('countryDropdown');
            uniqueCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));



        var data;  // Your data variable
        var dropdown = document.getElementById('countryDropdown');
        
        function renderSectorChart(data, selectedCountry) {
            // Get the container div
            var sectorContainer = document.getElementById('sectorChartContainer');
        
            // Clear the container before adding a new canvas
            sectorContainer.innerHTML = '';
        
            // Create a new canvas
            var canvas = document.createElement('canvas');
            canvas.id = 'sectorChart';
            sectorContainer.appendChild(canvas);
        
            var sectorCtx = canvas.getContext('2d');
        
            // Filter data for the selected country
            const countryData = data.filter(item => item.country === selectedCountry);
        
            // Count occurrences of each sector in the selected country
            const sectorCounts = {};
            countryData.forEach(entry => {
                const { sector } = entry;
                if (!sectorCounts[sector]) {
                    sectorCounts[sector] = 1;
                } else {
                    sectorCounts[sector]++;
                }
            });
        
            // Extract labels and values for the chart
            const sectorLabels = Object.keys(sectorCounts);
            const sectorValues = Object.values(sectorCounts);
        
            // Create a new chart instance
            new Chart(sectorCtx, {
                type: 'bar',
                data: {
                    labels: sectorLabels,
                    datasets: [{
                        label: `Sector Distribution in ${selectedCountry}`,
                        backgroundColor: 'rgba(75, 192, 192, 0.4)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: sectorValues,
                    }],
                },
                options: {
                    responsive: true,
                    aspectRatio: 1,
                },
            });
        }
        
        // Function to update the chart
// ...

// Function to update the chart (optional, you can remove this if not needed)
function updateChart() {
    const selectedCountry = document.getElementById('countryDropdown').value;
    renderSectorChart(data, selectedCountry);
}

// ...

        
        // Fetch the data and populate the dropdown
        fetch('api/dashboard/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(apiData => {
                console.log('Data from API:', apiData);
        
                // Assign the data to the global variable
                data = apiData;
        
                // Get unique countries from the data
                const uniqueCountries = [...new Set(apiData.map(item => item.country))];
        
                // Populate the dropdown with unique countries
                uniqueCountries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    dropdown.appendChild(option);
                });
        
                // Initial rendering of chart with the first country in the dropdown
                renderSectorChart(data, uniqueCountries[0]);
            })
            .catch(error => console.error('Error fetching data:', error));
        