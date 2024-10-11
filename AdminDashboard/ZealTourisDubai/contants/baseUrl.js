let baseUrl = 'http://localhost:3000/api';

if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://zeal-tourism.herokuapp.com/api';
} else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000/api';
}

export default baseUrl;