if (!process.env.REACT_APP_FETCH_BASE_URL) {
    throw new Error('FETCH_BASE_URL is missing!')
}

export const FETCH_BASE_URL = process.env.REACT_APP_FETCH_BASE_URL
