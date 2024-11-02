let baseUrl = 'https://zeal-backend-uqmg.onrender.com/';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {

    baseUrl = 'https://zeal-tourism.herokuapp.com/';
// eslint-disable-next-line no-undef

    baseUrl = 'https://zeal-backend-uqmg.onrender.com/';

} else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000/';
}

export default baseUrl;