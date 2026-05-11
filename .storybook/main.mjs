export default {
    stories: ['../stories/**/*.stories.@(js|mjs)'],
    addons: [],
    framework: {
        name: '@storybook/html-vite',
        options: {}
    },
    async viteFinal(config) {
        config.build = {
            ...config.build,
            chunkSizeWarningLimit: 1200
        };
        return config;
    }
};
