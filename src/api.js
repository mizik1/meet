export const getAccessToken = async () => {};

const accessToken = localStorage.getItem("access_token");

const tokenCheck = accessToken && (await checkToken(accessToken));

if (!accessToken || tokenCheck.error) {
  await localStorage.removeItem("access_token");
  const searchParams = new URLSearchParams(window.location.search);
  const code = await searchParams.get("code");
  if (!code) {
    const response = await fetch("YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT");
    const result = await response.json();
    const { authUrl } = result;
    return (window.location.href = authUrl);
  }
  return code && getToken(code);
}

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

return accessToken;

// OLD CODE USING MOCK DATA

// import mockData from "./mock-data";
// export const getEvents = () => {
//   return mockData;
// };

// Simulate fetching city suggestions
// export const getSuggestions = (query) => {
//   return new Promise((resolve) => {
//     const cities = ["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"];
//     const filteredCities = cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));
//     setTimeout(() => resolve(filteredCities), 500); // Simulate network latency
//   });
// };

// Extract unique locations from events
// export const extractLocations = (events) => {
//   const locations = events.map((event) => event.location);
//   return [...new Set(locations)]; // Return unique locations
// };
