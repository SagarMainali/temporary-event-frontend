// extract subdomain from full url
export const extractSubdomain = () => {
    const host = window.location.hostname; // e.g. localfest.event.com
    const parts = host.split(".");
    if (parts.length >= 2) return parts[0]; // "localfest"
    return null;
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}