import axios from "axios";


const clientId = "96f48e040b554b7f95693b1edf78388a";
const redirectUri = "https://spotify-xa5a.vercel.app/";
//const redirectUri = "http://localhost:3000"
const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = [
  "user-library-read",
   "playlist-read-private"
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
