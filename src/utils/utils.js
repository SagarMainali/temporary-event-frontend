// extract subdomain from full url
export const extractSubdomain = () => {
    const host = window.location.hostname;
    if (host === "localhost") return null; // dev handled separately
    const parts = host.split(".");
    return parts.length >= 2 ? parts[0] : null;
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}