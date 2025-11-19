// extract subdomain from full url
export const extractSubdomain = () => {
    const host = window.location.host;

    // local dev (path based)
    if (host.includes("tempevents.local")) { // use the mapped domain from your hosts file by hardcoding it directly, // NOTE:::although the mapped domain and .env domain is same in local environment, they differ in prod so don't use .env varialbe here instead hardcode it directly  
        const parts = window.location.pathname.split('/')
        return parts[2] // /sites/:slug → slug
    }

    // production (subdomain)
    const [subdomain, ...rest] = host.split('.')
    return subdomain
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}