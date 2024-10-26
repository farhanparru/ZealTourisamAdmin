let baseUrl = 'http://localhost:3002/api';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://zeal-tourism.herokuapp.com/api';
// eslint-disable-next-line no-undef
} else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3002/api';
}

export default baseUrl;