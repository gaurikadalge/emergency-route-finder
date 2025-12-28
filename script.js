// Initialized the map centered on Pune
const map = L.map('map').setView([18.5204, 73.8567], 12);

// Added tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Pune areas coordinates
const puneAreas = {
    "kothrud": { lat: 18.5068, lng: 73.8074 },
    "shivajinagar": { lat: 18.5314, lng: 73.8446 },
    "hinjewadi": { lat: 18.5925, lng: 73.7382 },
    "wakad": { lat: 18.5992, lng: 73.7618 },
    "aundh": { lat: 18.5522, lng: 73.8074 },
    "baner": { lat: 18.5596, lng: 73.7864 },
    "pimple saudagar": { lat: 18.5925, lng: 73.8064 },
    "viman nagar": { lat: 18.5679, lng: 73.9142 },
    "kharadi": { lat: 18.5522, lng: 73.9412 },
    "hadapsar": { lat: 18.5068, lng: 73.9412 },
    "katraj": { lat: 18.4529, lng: 73.8652 },
    "swargate": { lat: 18.4989, lng: 73.8556 },
    "deccan": { lat: 18.5158, lng: 73.8402 },
    "fc road": { lat: 18.5236, lng: 73.8334 },
    "jm road": { lat: 18.5236, lng: 73.8402 },
    "koregaon park": { lat: 18.5347, lng: 73.8934 },
    "camp": { lat: 18.5204, lng: 73.8777 },
    "shivane": { lat: 18.5433, lng: 73.7864 },
    "dhanori": { lat: 18.5992, lng: 73.8934 },
    "pimple nilakh": { lat: 18.5992, lng: 73.8064 }
};

// Safe spots data for different calamities in Pune (within 8km radius)
const safeSpots = {
    flood: [
        { 
            id: 1, 
            name: "Balewadi Stadium Complex", 
            lat: 18.5750, 
            lng: 73.7720, 
            type: "Sports Complex", 
            capacity: 5000, 
            contact: "020-27291234", 
            safetyScore: 94, 
            roadDistance: 6.2,
            factors: ["Elevated location", "Large open area", "Emergency facilities", "Multiple access roads"],
            evacuationTips: ["Avoid low-lying areas and river banks", "Move to higher ground immediately", "Do not attempt to drive through flooded roads"]
        },
        { 
            id: 2, 
            name: "Phoenix Marketcity", 
            lat: 18.5620, 
            lng: 73.9165, 
            type: "Shopping Mall", 
            capacity: 3000, 
            contact: "020-67291234", 
            safetyScore: 88, 
            roadDistance: 7.8,
            factors: ["Multi-level structure", "Parking garage", "Food court", "Emergency power"],
            evacuationTips: ["Head to upper levels of the building", "Stay away from glass windows", "Follow mall security instructions"]
        },
        { 
            id: 3, 
            name: "Amanora Town Centre", 
            lat: 18.5280, 
            lng: 73.9280, 
            type: "Commercial Complex", 
            capacity: 2500, 
            contact: "020-66291234", 
            safetyScore: 86, 
            roadDistance: 8.1,
            factors: ["Elevated structures", "Multiple buildings", "Open spaces", "Security personnel"],
            evacuationTips: ["Move to higher floors in buildings", "Avoid underground parking areas", "Use stairs instead of elevators"]
        },
        { 
            id: 4, 
            name: "Empress Garden", 
            lat: 18.5320, 
            lng: 73.8920, 
            type: "Botanical Garden", 
            capacity: 1500, 
            contact: "020-25461234", 
            safetyScore: 82, 
            roadDistance: 4.5,
            factors: ["High ground location", "Open spaces", "Multiple exits", "Natural drainage"],
            evacuationTips: ["Move to highest points in the garden", "Avoid water bodies within the garden", "Stay in open areas away from trees"]
        }
    ],
    earthquake: [
        { 
            id: 5, 
            name: "Race Course Ground", 
            lat: 18.5150, 
            lng: 73.8550, 
            type: "Open Ground", 
            capacity: 8000, 
            contact: "020-26121234", 
            safetyScore: 96, 
            roadDistance: 3.2,
            factors: ["Vast open area", "Away from tall buildings", "Multiple access points", "Emergency services nearby"],
            evacuationTips: ["Drop, Cover and Hold On during shaking", "Move to open areas after shaking stops", "Stay away from buildings and power lines"]
        },
        { 
            id: 6, 
            name: "Peshwe Park", 
            lat: 18.5080, 
            lng: 73.8250, 
            type: "Public Park", 
            capacity: 4000, 
            contact: "020-25451234", 
            safetyScore: 92, 
            roadDistance: 2.8,
            factors: ["Large open spaces", "Away from structures", "Multiple entry points", "City corporation maintained"],
            evacuationTips: ["Watch for falling trees or branches", "Move to center of open areas", "Help others if safe to do so"]
        },
        { 
            id: 7, 
            name: "University Ground", 
            lat: 18.5520, 
            lng: 73.8250, 
            type: "Educational Campus", 
            capacity: 6000, 
            contact: "020-25671234", 
            safetyScore: 90, 
            roadDistance: 4.1,
            factors: ["Designated emergency assembly", "Open grounds", "First aid facilities", "Trained staff"],
            evacuationTips: ["Follow established evacuation routes", "Avoid building facades and windows", "Move quickly but don't run"]
        },
        { 
            id: 8, 
            name: "Hinjewadi IT Park Open Areas", 
            lat: 18.5920, 
            lng: 73.7450, 
            type: "IT Park Grounds", 
            capacity: 5000, 
            contact: "020-22901234", 
            safetyScore: 88, 
            roadDistance: 7.5,
            factors: ["Multiple open spaces", "Away from high-rises", "Emergency protocols", "Security coordination"],
            evacuationTips: ["Avoid glass buildings", "Move to designated assembly points", "Follow security personnel directions"]
        }
    ],
    security: [
        { 
            id: 9, 
            name: "Shivajinagar Police Headquarters", 
            lat: 18.5314, 
            lng: 73.8446, 
            type: "Police Station", 
            capacity: 800, 
            contact: "100", 
            safetyScore: 98, 
            roadDistance: 2.5,
            factors: ["Maximum security", "Armed personnel", "Communication center", "Emergency response coordination"],
            evacuationTips: ["Remain calm and follow all instructions", "Keep identification documents ready", "Report suspicious activities immediately"]
        },
        { 
            id: 10, 
            name: "Southern Command HQ", 
            lat: 18.5080, 
            lng: 73.8800, 
            type: "Military Base", 
            capacity: 2000, 
            contact: "020-26101234", 
            safetyScore: 99, 
            roadDistance: 4.8,
            factors: ["Highest security level", "Military personnel", "Emergency protocols", "Protected perimeter"],
            evacuationTips: ["Cooperate fully with security checks", "Follow instructions precisely", "Do not take photographs or videos"]
        },
        { 
            id: 11, 
            name: "Yerwada Central Jail Complex", 
            lat: 18.5520, 
            lng: 73.8800, 
            type: "Security Facility", 
            capacity: 1200, 
            contact: "020-26611234", 
            safetyScore: 95, 
            roadDistance: 5.2,
            factors: ["High security perimeter", "Armed guards", "Controlled access", "Emergency lockdown capability"],
            evacuationTips: ["Have identification ready at all times", "Follow security protocols strictly", "Remain in designated safe areas"]
        },
        { 
            id: 12, 
            name: "Council Hall Government Complex", 
            lat: 18.5200, 
            lng: 73.8500, 
            type: "Government Facility", 
            capacity: 1500, 
            contact: "020-26151234", 
            safetyScore: 92, 
            roadDistance: 3.5,
            factors: ["Security personnel", "Controlled access points", "Emergency communication", "Government resources"],
            evacuationTips: ["Follow official instructions only", "Keep government IDs accessible", "Avoid large gatherings near the complex"]
        }
    ],
    fire: [
        { 
            id: 13, 
            name: "Kothrud Fire Station", 
            lat: 18.5100, 
            lng: 73.8150, 
            type: "Fire Station", 
            capacity: 400, 
            contact: "101", 
            safetyScore: 97, 
            roadDistance: 1.8,
            factors: ["Firefighting equipment", "Trained firefighters", "Emergency vehicles", "Communication systems"],
            evacuationTips: ["Stay low to avoid smoke inhalation", "Use staircases, not elevators", "Test doors for heat before opening"]
        },
        { 
            id: 14, 
            name: "Chaturshringi Temple Ground", 
            lat: 18.5150, 
            lng: 73.8300, 
            type: "Temple Complex", 
            capacity: 3000, 
            contact: "020-25431234", 
            safetyScore: 91, 
            roadDistance: 2.2,
            factors: ["Large open courtyard", "Away from buildings", "Multiple exits", "Emergency water sources"],
            evacuationTips: ["Move upwind from the fire source", "Cover mouth with wet cloth", "Avoid synthetic clothing that melts easily"]
        },
        { 
            id: 15, 
            name: "Savitribai Phule University Ground", 
            lat: 18.5520, 
            lng: 73.8250, 
            type: "University Campus", 
            capacity: 5000, 
            contact: "020-25601234", 
            safetyScore: 89, 
            roadDistance: 4.1,
            factors: ["Multiple open grounds", "Emergency assembly points", "First aid facilities", "Trained emergency team"],
            evacuationTips: ["Follow campus emergency procedures", "Move to designated safe zones", "Account for all family members"]
        },
        { 
            id: 16, 
            name: "Magarpatta City Club Ground", 
            lat: 18.5150, 
            lng: 73.9250, 
            type: "Residential Complex", 
            capacity: 2500, 
            contact: "020-26801234", 
            safetyScore: 87, 
            roadDistance: 7.2,
            factors: ["Open recreational areas", "Swimming pool water source", "Multiple access roads", "Trained security"],
            evacuationTips: ["Move to open club grounds", "Use water sources for protection if needed", "Follow community security instructions"]
        }
    ]
};

// Global variables
let currentLocation = puneAreas["kothrud"];
let currentCalamityType = 'flood';
let markers = [];
let routeControl = null;
let selectedSafeSpot = null;
let nearestSafeSpot = null;

// DOM elements
const calamityButtons = document.querySelectorAll('.calamity-btn');
const findRoutesBtn = document.getElementById('find-routes-btn');
const currentLocationInput = document.getElementById('current-location');
const safeSpotsContainer = document.getElementById('safe-spots-container');
const routeInfo = document.getElementById('route-info');
const routeDetails = document.getElementById('route-details');
const routeInstructions = document.getElementById('route-instructions');
const statusBar = document.getElementById('status-bar');

// Event listeners
calamityButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        calamityButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCalamityType = this.getAttribute('data-type');
        updateStatus(`Emergency type set to: ${capitalizeFirstLetter(currentCalamityType)}. Click 'Find Evacuation Routes' to update.`);
    });
});

findRoutesBtn.addEventListener('click', function() {
    if (currentLocationInput.value) {
        detectAreaFromInput();
    } else {
        updateStatus('Please enter your location in Pune');
    }
});

// Initialize with Kothrud routes
window.onload = function() {
    findEvacuationRoutes();
};

// Functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateStatus(message) {
    statusBar.textContent = message;
}

function detectAreaFromInput() {
    const inputText = currentLocationInput.value.toLowerCase().trim();
    let areaFound = null;
    
    // Check if input matches any known Pune area
    for (const area in puneAreas) {
        if (inputText.includes(area)) {
            areaFound = puneAreas[area];
            break;
        }
    }
    
    if (areaFound) {
        currentLocation = areaFound;
        updateStatus(`Location set to: ${inputText}. Finding evacuation routes...`);
        map.setView([currentLocation.lat, currentLocation.lng], 13);
        addLocationMarker(currentLocation, `Your Location: ${inputText}`);
        findEvacuationRoutes();
    } else {
        updateStatus('Area not recognized. Using Kothrud as default.');
        currentLocation = puneAreas["kothrud"];
        currentLocationInput.value = "Kothrud";
        map.setView([currentLocation.lat, currentLocation.lng], 13);
        addLocationMarker(currentLocation, 'Your Location: Kothrud');
        findEvacuationRoutes();
    }
}

function addLocationMarker(location, title) {
    // Clear previous location marker
    clearMarkers();
    
    // Add new marker with custom icon
    const marker = L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(`<div class="location-popup"><strong>${title}</strong></div>`);
    
    markers.push(marker);
}

function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Clear any existing routing control
    if (routeControl) {
        map.removeControl(routeControl);
        routeControl = null;
    }
}

// core function
function findEvacuationRoutes() {
    if (!currentLocation) {
        updateStatus('Please set your location first');
        return;
    }
    
    updateStatus(`Finding ${currentCalamityType} evacuation routes within 8km...`);
    findRoutesBtn.innerHTML = '<div class="loading"></div> Finding Routes...';
    
    // Clear previous safe spot markers and route
    clearMarkers();
    
    // Add current location marker
    addLocationMarker(currentLocation, 'Your Location');
    
    // Get safe spots for current calamity type
    const spots = safeSpots[currentCalamityType];
    
    // Calculate straight-line distances and find the nearest spot
    let nearestSpot = null;
    let minDistance = Infinity;
    
    spots.forEach(spot => {
        // Calculate straight-line distance for sorting
        spot.straightDistance = calculateDistance(
            currentLocation.lat, currentLocation.lng,
            spot.lat, spot.lng
        );
        
        // Adjust safety score based on distance (closer = better)
        const distanceFactor = Math.max(0, 100 - spot.straightDistance * 5);
        spot.adjustedSafetyScore = Math.min(100, spot.safetyScore + distanceFactor / 10);
        
        // Check if this is the nearest spot
        if (spot.straightDistance < minDistance) {
            minDistance = spot.straightDistance;
            nearestSpot = spot;
        }
    });
    
    // Filter spots within 8km and sort by safety score (highest first)
    const nearbySpots = spots.filter(spot => spot.straightDistance <= 8)
                           .sort((a, b) => b.adjustedSafetyScore - a.adjustedSafetyScore);
    
    // Display safe spots in the sidebar with nearest highlighted
    displaySafeSpots(nearbySpots, nearestSpot);
    
    // Add markers for safe spots
    nearbySpots.forEach(spot => {
        // Determine marker color based on safety score
        let color;
        if (spot.adjustedSafetyScore >= 90) {
            color = '#10b981'; // Green
        } else if (spot.adjustedSafetyScore >= 80) {
            color = '#f59e0b'; // Orange
        } else {
            color = '#ef4444'; // Red
        }
        
        // Custom icon for safe spots
        const safeSpotIcon = L.divIcon({
            className: 'safe-spot-marker',
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const isNearest = spot === nearestSpot;
        
        const marker = L.marker([spot.lat, spot.lng], {icon: safeSpotIcon})
            .addTo(map)
            .bindPopup(`
                ${isNearest ? '<div style="color: #3b82f6; font-weight: bold;">NEAREST EVACUATION POINT</div>' : ''}
                <div><strong>${spot.name}</strong></div>
                <div>Type: ${spot.type}</div>
                <div>Safety Score: ${spot.adjustedSafetyScore.toFixed(0)}/100</div>
                <div>Road Distance: ${spot.roadDistance} km</div>
                <div>Capacity: ${spot.capacity} people</div>
                <div>Contact: ${spot.contact}</div>
            `);
        
        if (isNearest) {
            marker.openPopup();
        }
        
        markers.push(marker);
    });
    
    // Automatically show route to nearest safe spot
    if (nearestSpot) {
        nearestSafeSpot = nearestSpot;
        showRouteToSafeSpot(nearestSpot);
    }
    
    // Fit map to show all markers with padding
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
    
    updateStatus(`Found ${nearbySpots.length} safe evacuation spots for ${currentCalamityType}. Nearest: ${nearestSpot.name}`);
    findRoutesBtn.innerHTML = '<i class="fas fa-route"></i> Find Evacuation Routes';
}

function displaySafeSpots(spots, nearestSpot) {
    safeSpotsContainer.innerHTML = '';
    
    if (spots.length === 0) {
        safeSpotsContainer.innerHTML = '<div class="calamity-info">No safe spots found within 8km. Expand search area or try different location.</div>';
        return;
    }
    
    spots.forEach(spot => {
        const spotElement = document.createElement('div');
        spotElement.className = 'safe-spot-item';
        if (spot === nearestSpot) {
            spotElement.classList.add('active');
        }
        
        let scoreClass = 'score-high';
        if (spot.adjustedSafetyScore < 90) scoreClass = 'score-medium';
        if (spot.adjustedSafetyScore < 80) scoreClass = 'score-low';
        
        spotElement.innerHTML = `
            <div class="safe-spot-header">
                <div class="safe-spot-name">
                    ${spot.name}
                    ${spot === nearestSpot ? '<span class="nearest-badge">NEAREST</span>' : ''}
                    <span class="distance-badge">${spot.roadDistance} km</span>
                </div>
                <div class="safety-score ${scoreClass}">
                    <i class="fas fa-shield-alt"></i> ${spot.adjustedSafetyScore.toFixed(0)}/100
                </div>
            </div>
            <div class="safe-spot-details">
                Type: ${spot.type} | Capacity: ${spot.capacity} people<br>
                Contact: ${spot.contact}
            </div>
        `;
        
        spotElement.addEventListener('click', function() {
            // Remove active class from all spots
            document.querySelectorAll('.safe-spot-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked spot
            this.classList.add('active');
            
            // Show route to this safe spot
            showRouteToSafeSpot(spot);
            selectedSafeSpot = spot;
        });
        
        safeSpotsContainer.appendChild(spotElement);
    });
}

function showRouteToSafeSpot(spot) {
    updateStatus(`Calculating road route to ${spot.name}...`);
    
    // Clear previous route
    if (routeControl) {
        map.removeControl(routeControl);
    }
    
    // Set route color based on calamity type
    let routeColor = '#3b82f6'; // Default blue
    if (currentCalamityType === 'flood') routeColor = '#1d4ed8';
    if (currentCalamityType === 'earthquake') routeColor = '#ea580c';
    if (currentCalamityType === 'security') routeColor = '#dc2626';
    if (currentCalamityType === 'fire') routeColor = '#b91c1c';
    
    // Use Leaflet Routing Machine for real road routing
    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(currentLocation.lat, currentLocation.lng),
            L.latLng(spot.lat, spot.lng)
        ],
        routeWhileDragging: false,
        showAlternatives: false,
        lineOptions: {
            styles: [
                {
                    color: routeColor,
                    weight: 6,
                    opacity: 0.8
                }
            ]
        },
        createMarker: function() { return null; }, // Don't create default markers
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
    }).addTo(map);
    
    // Routing to Safe Spot
    routeControl.on('routesfound', function(e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
            const route = routes[0];
            const travelTime = Math.round(route.summary.totalTime / 60); // Convert to minutes
            const distance = (route.summary.totalDistance / 1000).toFixed(1); // Convert to km
            
            // Update the spot with actual road distance
            spot.roadDistance = distance;
            
            // Generate turn-by-turn instructions
            let instructionsHTML = '<h5>Turn-by-Turn Directions:</h5>';
            route.instructions.forEach(function(instruction, index) {
                instructionsHTML += `
                    <div class="instruction-step">
                        <strong>${index + 1}.</strong> ${instruction.text} (${(instruction.distance / 1000).toFixed(1)} km)
                    </div>
                `;
            });
            
            routeInstructions.innerHTML = instructionsHTML;
            
            // Show route information with calamity-specific tips
            routeDetails.innerHTML = `
                <p><strong>Evacuation Point:</strong> ${spot.name}</p>
                <p><strong>Road Distance:</strong> ${distance} km</p>
                <p><strong>Estimated Evacuation Time:</strong> ${travelTime} minutes</p>
                <p><strong>Facility Type:</strong> ${spot.type}</p>
                <p><strong>Safety Score:</strong> ${spot.adjustedSafetyScore.toFixed(0)}/100</p>
                <p><strong>Contact:</strong> ${spot.contact}</p>
                <div class="safety-factors">
                    <p><strong>Safety Features:</strong></p>
                    <ul>
                        ${spot.factors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            routeInfo.classList.add('active');
            
            updateStatus(`Real road route to ${spot.name} calculated. Distance: ${distance} km, Time: ${travelTime} min`);
        }
    });
    
    // Handle routing errors
    routeControl.on('routingerror', function(e) {
        updateStatus('Routing service error. Showing straight-line route instead.');
        showStraightLineRoute(spot);
    });
}

// Fallback function if OSRM routing fails
function showStraightLineRoute(spot) {
    // Draw a straight line as fallback
    const straightLine = L.polyline([
        [currentLocation.lat, currentLocation.lng],
        [spot.lat, spot.lng]
    ], {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Calculate approximate travel time (assuming 20 km/h in emergency)
    const travelTime = Math.round((spot.straightDistance / 20) * 60);
    
    routeDetails.innerHTML = `
        <p><strong>Evacuation Point:</strong> ${spot.name}</p>
        <p><strong>Straight-line Distance:</strong> ${spot.straightDistance.toFixed(1)} km</p>
        <p><strong>Estimated Evacuation Time:</strong> ${travelTime} minutes (approximate)</p>
        <p><strong>Facility Type:</strong> ${spot.type}</p>
        <p><strong>Safety Score:</strong> ${spot.adjustedSafetyScore.toFixed(0)}/100</p>
        <p><strong>Contact:</strong> ${spot.contact}</p>
        <div class="safety-factors">
            <p><strong>Safety Features:</strong></p>
            <ul>
                ${spot.factors.map(factor => `<li>${factor}</li>`).join('')}
            </ul>
        </div>
        <div class="calamity-info">
            <p><strong>Note:</strong> Straight-line route shown due to routing service issue. Follow major roads toward destination.</p>
        </div>
    `;
    
    routeInfo.classList.add('active');
    routeInstructions.innerHTML = '<p>Turn-by-turn directions unavailable. Follow major roads toward the destination.</p>';
    
    updateStatus(`Straight-line route to ${spot.name}. Distance: ${spot.straightDistance.toFixed(1)} km, Time: ${travelTime} min`);
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}