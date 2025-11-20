// extract subdomain from full url
export const extractSubdomain = () => {
    const domain = import.meta.env.VITE_DOMAIN_NAME;

    const hostname = window.location.hostname;
    const parts = hostname.split(`.${domain}`);

    return parts[0] !== domain ? parts[0] : null
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}