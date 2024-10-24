import mockData from "./mock-data";

export const getEvents = async () => {
  // Use mock data if on localhost
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // If offline, return cached events from localStorage
  if (!navigator.onLine) {
    const cachedEvents = localStorage.getItem("events");
    return cachedEvents ? JSON.parse(cachedEvents) : [];
  }

  // If online, get the access token and fetch events
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://4mbcij85gk.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result && result.events) {
      // Cache events in localStorage
      localStorage.setItem("events", JSON.stringify(result.events));
      return result.events;
    } else {
      return null;
    }
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch("https://4mbcij85gk.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url");
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

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

// Function to check if the token is valid
export const checkToken = async (accessToken) => {
  const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

// Function to exchange authorization code for access token
export const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(`https://4mbcij85gk.execute-api.us-west-1.amazonaws.com/dev/api/token/${encodeCode}`);
  const { access_token } = await response.json();
  localStorage.setItem("access_token", access_token);
  return access_token;
};

// Extract unique locations from events
export const extractLocations = (events) => {
  const locations = events.map((event) => event.location);
  return [...new Set(locations)];
};
