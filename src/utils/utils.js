// extract subdomain from full url
export const extractSubdomain = () => {
    const domain = import.meta.env.VITE_DOMAIN_NAME;

    const host = window.location.host;
    const parts = host.split(`.${domain}`);

    return parts[0] !== domain ? parts[0] : null
};

// get app mode and website id
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const appMode = params.get('appMode'); // e.g., 'website', 'cms'
    const websiteId = params.get('websiteId');

    return { appMode, websiteId };
}

// format date(only for displaying)
export function formatDate(date) {
    if (!date) {
        return "N/A";
    }

    const dateObj = new Date(date) // convert to dateObj

    // Check if the conversion is valid
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const protocol = import.meta.env.DEV ? "http" : "https";
const domainName = import.meta.env.VITE_DOMAIN_NAME;

export function buildWebsiteUrl(subdomain) {
  if (!subdomain) return "#";
  return domainName
    ? `${protocol}://${subdomain}.${domainName}`
    : `${protocol}://${subdomain}`;
}