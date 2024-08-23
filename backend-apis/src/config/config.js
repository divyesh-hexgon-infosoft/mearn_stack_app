module.exports.Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3331,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'root',
    DB_DATABASE: process.env.DB_DATABASE || 'mern_stack_app',
    SECRET_JWT: process.env.SECRET_JWT || "abc",
    API_PATH : 'http://localhost:3001'
};
