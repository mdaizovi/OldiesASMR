import Constants from 'expo-constants'

const settings = {
    dev: {
        apiUrl : "https://www.oldiesinanotherroom.com/api/music_library/playlist"
    },
    staging: {
        apiUrl : "https://www.oldiesinanotherroom.com/api/music_library/playlist"
    },
    prod: {
        apiUrl : "https://www.oldiesinanotherroom.com/api/music_library/playlist"
    },
}

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
    return settings.prod;
}

export default getCurrentSettings();