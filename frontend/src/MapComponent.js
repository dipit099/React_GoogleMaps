import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { FaLocationArrow } from "react-icons/fa";

import './MapComponent.css'; // Import custom CSS file

const center = { lat: 23.7330, lng: 90.4172 };

function MapComponent() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure this key is correct
        libraries: ['places'],
    });

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const originRef = useRef();
    const destinationRef = useRef();

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            alert("Please enter both origin and destination.");
            return;
        }

        // Clear previous route data
        setDirectionsResponse(null);
        setRoutes([]);
        setDistance('');
        setDuration('');

        try {
            const directionsService = new window.google.maps.DirectionsService(); // Use window.google.maps
            const results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                travelMode: window.google.maps.TravelMode.DRIVING, // Use window.google.maps.TravelMode
                provideRouteAlternatives: true,
            });

            setDirectionsResponse(results);
            setRoutes(results.routes);
            setSelectedRouteIndex(0); // Reset to the first route
            setDistance(results.routes[0].legs[0].distance.text);
            setDuration(results.routes[0].legs[0].duration.text);
        } catch (error) {
            console.error("Error fetching directions:", error);
            alert("Failed to fetch directions. Please try again.");
        }
    }


    // function clearRoute() {
    //     setDirectionsResponse(null);
    //     setRoutes([]);
    //     setDistance('');
    //     setDuration('');
    //     originRef.current.value = '';
    //     destinationRef.current.value = '';
    // }

    function handleRouteSelection(index) {
        setSelectedRouteIndex(index);
        setDistance(routes[index].legs[0].distance.text);
        setDuration(routes[index].legs[0].duration.text);
    }
    function centerMap() {
        // Assuming `map` and `center` are defined in your script
        map.panTo(center);
        map.setZoom(15);
    }

    if (!isLoaded) {
        return <div className="skeleton-text">Loading...</div>;
    }

    return (
        <div className="map-component">
            <div className="map-container">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer
                            directions={directionsResponse}
                            routeIndex={selectedRouteIndex}
                            options={{
                                polylineOptions: {
                                    strokeColor: selectedRouteIndex === 0 ? "#FF0000" : "#0000FF", // Different color for the main route
                                    strokeOpacity: 0.7,
                                    strokeWeight: 5,
                                },
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
            <div className="control-panel">
                <div className="input-container">
                    <div>
                        <Autocomplete>
                            <input type="text" placeholder="Origin" ref={originRef} className="input-field" />
                        </Autocomplete>
                    </div>
                    <div>
                        <Autocomplete>
                            <input type="text" placeholder="Destination" ref={destinationRef} className="input-field" />
                        </Autocomplete>
                    </div>
                    <div className="buttons-container">
                        <button className="calculate-btn" onClick={calculateRoute}>
                            Calculate Route
                        </button>
                        {/* <button className="clear-btn" onClick={clearRoute}>
                            <span className="icon">×</span> 
                        </button> */}
                    </div>
                </div>

                <div className="info-container">
                    <div className="info-header">
                        <span>Distance: {distance}</span>
                        <div className="duration-container">
                            <span>Duration: {duration}</span>
                            <button class="icon-button" aria-label="center back" onclick={centerMap}>
                                <FaLocationArrow />
                            </button>                          

                        </div>
                    </div>
                    <span>Choose a route:</span>
                    {routes.length > 1 && (
                        <div className="route-selection">

                            <div className="route-buttons">
                                {routes.map((route, index) => (
                                    <button
                                        key={index}
                                        className={`route-btn ${selectedRouteIndex === index ? 'selected' : ''}`}
                                        onClick={() => handleRouteSelection(index)}
                                    >
                                        Route {index + 1}: {route.summary}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MapComponent;
