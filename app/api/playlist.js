import { create } from 'apisauce'
import apiClient from './client';

const endpoint = 'api/music_library/playlist'
// const getListings = () => apiClient.get(endpoint).then(response => {
//     if (!response.ok) {
//         response.problem
//     }
// })

const getPlaylist = () => apiClient.get(endpoint);

export default {
    getPlaylist
}