export default () => ({
    host: process.env.MESH_HOST || '0.0.0.0',
    port: parseInt(process.env.MESH_PORT, 10) || 4002,
    logger: {
        level: process.env.LOG_LEVEL || process.env.LOGGING_LEVEL || 'INFO'
    },
    templates: {
        path: process.env.TEMPLATES_PATH || 'templates',
    },
    test: {
        sendEnabled: process.env.ENABLED_SEND || false,
    },
    email: {
        from: process.env.SOURCE_EMAIL || 'no-reply@nerdsletter.com',
    }
});
