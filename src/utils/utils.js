// extract subdomain from full url
export const extractSubdomain = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    return parts.length >= 3 ? parts[0] : null
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}