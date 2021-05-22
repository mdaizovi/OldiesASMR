import Constants from 'expo-constants'

const settings = {
    
    dev: {
        BackendUrl: "http://127.0.0.1:8000/api",
        apiUrl : "http://127.0.0.1:8000/api/music_library/playlist",
        skipUrl : "http://127.0.0.1:8000/api/music_library/skip"
    },
    staging: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api",
        apiUrl : "https://www.oldiesinanotherroom.com/api/music_library/playlist",
        skipUrl : "https://www.oldiesinanotherroom.com/api/music_library/skip"
    },
    prod: {
        BackendUrl: "https://www.oldiesinanotherroom.com/api",
        apiUrl : "https://www.oldiesinanotherroom.com/api/music_library/playlist",
        skipUrl : "https://www.oldiesinanotherroom.com/api/music_library/skip"
    },
}

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();