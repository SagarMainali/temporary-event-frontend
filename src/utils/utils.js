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

// format date
export const getformattedDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
        // weekday: 'long', // 'long' or 'short'
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: true, // AM/PM
    })
}