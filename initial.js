
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
//   VStack,
// } from '@chakra-ui/react';

// import { FaLocationArrow, FaTimes } from 'react-icons/fa';

// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from '@react-google-maps/api';
// import { useRef, useState } from 'react';

// const center = { lat: 23.7330, lng: 90.4172 };

// function MapComponent() {
//   const { isLoaded } = useJsApiLoader({
//       googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure this key is correct
//       libraries: ['places'],
//   });

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [routes, setRoutes] = useState([]);
//   const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');

//   const originRef = useRef();
//   const destinationRef = useRef();

//   async function calculateRoute() {
//       if (originRef.current.value === '' || destinationRef.current.value === '') {
//           alert("Please enter both origin and destination.");
//           return;
//       }

//       try {
//           const directionsService = new window.google.maps.DirectionsService(); // Use window.google.maps
//           const results = await directionsService.route({
//               origin: originRef.current.value,
//               destination: destinationRef.current.value,
//               travelMode: window.google.maps.TravelMode.DRIVING, // Use window.google.maps.TravelMode
//               provideRouteAlternatives: true,
//           });

//           setDirectionsResponse(results);
//           setRoutes(results.routes);
//           setSelectedRouteIndex(0); // Reset to the first route
//           setDistance(results.routes[0].legs[0].distance.text);
//           setDuration(results.routes[0].legs[0].duration.text);
//       } catch (error) {
//           console.error("Error fetching directions:", error);
//           alert("Failed to fetch directions. Please try again.");
//       }
//   }

//   function clearRoute() {
//       setDirectionsResponse(null);
//       setRoutes([]);
//       setDistance('');
//       setDuration('');
//       originRef.current.value = '';
//       destinationRef.current.value = '';
//   }

//   function handleRouteSelection(index) {
//       setSelectedRouteIndex(index);
//       setDistance(routes[index].legs[0].distance.text);
//       setDuration(routes[index].legs[0].duration.text);
//   }

//   if (!isLoaded) {
//       return <SkeletonText />;
//   }

//   return (
//       <Flex
//           position="relative"
//           flexDirection="column"
//           alignItems="center"
//           h="100vh"
//           w="100vw"
//       >
//           <Box position="absolute" left={0} top={0} h="100%" w="100%">
//               {/* Google Map Box */}
//               <GoogleMap
//                   center={center}
//                   zoom={15}
//                   mapContainerStyle={{ width: '100%', height: '100%' }}
//                   options={{
//                       zoomControl: false,
//                       streetViewControl: false,
//                       mapTypeControl: false,
//                       fullscreenControl: false,
//                   }}
//                   onLoad={(map) => setMap(map)}
//               >
//                   <Marker position={center} />
//                   {directionsResponse && (
//                       <DirectionsRenderer
//                           directions={directionsResponse}
//                           routeIndex={selectedRouteIndex}
//                           options={{
//                               polylineOptions: {
//                                   strokeColor: selectedRouteIndex === 0 ? "#FF0000" : "#0000FF", // Different color for the main route
//                                   strokeOpacity: 0.7,
//                                   strokeWeight: 5,
//                               },
//                           }}
//                       />
//                   )}
//               </GoogleMap>
//           </Box>
//           <Box
//               p={4}
//               borderRadius="lg"
//               m={4}
//               bgColor="white"
//               shadow="base"
//               minW="container.md"
//               zIndex="1"
//           >
//               <HStack spacing={2} justifyContent="space-between">
//                   <Box flexGrow={1}>
//                       <Autocomplete>
//                           <Input type="text" placeholder="Origin" ref={originRef} />
//                       </Autocomplete>
//                   </Box>
//                   <Box flexGrow={1}>
//                       <Autocomplete>
//                           <Input type="text" placeholder="Destination" ref={destinationRef} />
//                       </Autocomplete>
//                   </Box>

//                   <ButtonGroup>
//                       <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
//                           Calculate Route
//                       </Button>
//                       <IconButton
//                           aria-label="clear route"
//                           icon={<FaTimes />}
//                           onClick={clearRoute}
//                       />
//                   </ButtonGroup>
//               </HStack>

//               <VStack spacing={4} mt={4} alignItems="flex-start" w="full">
//                   <Flex
//                       w="full"
//                       justify="space-between"
//                       align="center"
//                   >
//                       <Text>Distance: {distance}</Text>
//                       <HStack spacing={4} align="center">
//                           <Text>Duration: {duration}</Text>
//                           <IconButton
//                               aria-label="center back"
//                               icon={<FaLocationArrow />}
//                               isRound
//                               onClick={() => {
//                                   map.panTo(center);
//                                   map.setZoom(15);
//                               }}
//                           />
//                       </HStack>
//                   </Flex>
//                   {routes.length > 1 && (
//                       <Box mt={4}>
//                           <Text>Choose a route:</Text>
//                           <ButtonGroup>
//                               {routes.map((route, index) => (
//                                   <Button
//                                       key={index}
//                                       colorScheme={selectedRouteIndex === index ? 'teal' : 'gray'}
//                                       onClick={() => handleRouteSelection(index)}
//                                   >
//                                       Route {index + 1}: {route.summary}
//                                   </Button>
//                               ))}
//                           </ButtonGroup>
//                       </Box>
//                   )}
//               </VStack>


//           </Box>
//       </Flex>
//   );
// }

// export default MapComponent;
