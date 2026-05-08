import '../bundles/demo-minimal.css';
import '../js/accordion.js';

export const parameters = {
    layout: 'padded',
    options: {
        storySort: {
            order: [
                'Foundation',
                'Primitives',
                'Components',
                'Product Page',
                ['Hero', 'Configurator', 'Post Configurator'],
                'Checkout',
                ['Cart', 'Shipping & Payment', 'Summary', 'Forms'],
                'Dashboard',
                ['Overview', 'Orders', 'Order Detail', 'Billing'],
                'Landing Page',
                ['Catalog', 'Reviews'],
                'Sections'
            ]
        }
    }
};
