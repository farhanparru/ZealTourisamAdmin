let baseUrl = 'https://zeal-backend-uqmg.onrender.com/api';

if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://zeal-backend-uqmg.onrender.com/api';
} else if (process.env.NODE_ENV === 'development') {
    baseUrl = 'https://zeal-backend-uqmg.onrender.com/api';
}

export default baseUrl;