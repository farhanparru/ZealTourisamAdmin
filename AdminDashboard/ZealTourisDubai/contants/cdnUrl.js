let baseUrl = 'http://localhost:3000/';

if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://zeal-tourism.herokuapp.com/';
} else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000/';
}

export default baseUrl;