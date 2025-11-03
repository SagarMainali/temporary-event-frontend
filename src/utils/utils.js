// extract subdomain from full url
export const extractSubdomain = () => {
    const host = window.location.hostname; // e.g. localfest.event.com
    const parts = host.split(".");
    if (parts.length >= 2) return parts[0]; // "localfest"
    return null;
};
