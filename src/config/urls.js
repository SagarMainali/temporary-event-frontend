// ----------------- 🔐 Auth API Routes -----------------
export const registerUserUrl = '/auth/register'
export const loginUrl = '/auth/login'
export const checkAuthStateUrl = 'auth/checkAuthState'
export const logoutUrl = '/auth/logout'
export const forgotPasswordUrl = '/auth/forgot-password'
export const resetPasswordUrl = '/auth/reset-password'
export const changePasswordUrl = '/auth/change-password'
export const refreshTokenUrl = '/auth/refresh-token'

// ----------------- 🎡 Event API Routes -----------------
export const createEventUrl = '/event/create'
export const fetchEventsUrl = '/event'
export const fetchEventUrl = (eventId) => `/event/${eventId}`
export const updateEventUrl = (eventId) => `/event/${eventId}`
export const deleteEventUrl = (eventId) => `/event/${eventId}`

// ----------------- 💻 Event API Routes -----------------
export const createWebsiteUrl = '/website/create'
export const getWebsiteUrl = (websiteId) => `/website/private/${websiteId}`
export const saveWebsiteUrl = (websiteId) => `/website/save/${websiteId}`
export const getSectionUrl = (websiteId, sectionId) => `/website/section/${websiteId}/${sectionId}`
export const updateSectionUrl = (websiteId, sectionId) => `/website/section/${websiteId}/${sectionId}`
export const deleteWebsiteUrl = (websiteId) => `/website/${websiteId}`
export const getPublicWebsiteUrl = (subdomain) => `/website/public/${subdomain}`
export const publishWebsiteUrl = (websiteId) => `/website/publish/${websiteId}`
export const unpublishWebsiteUrl = (websiteId) => `/website/unpublish/${websiteId}`
export const getPublishedWebsitesUrl = '/website/published/'
export const sendEmailUrl = '/website/sendEmail'

// ----------------- 📋 Temmplate API Routes -----------------
export const addTemplateUrl = '/template/add'
export const getAllTemplatesUrl = '/template/all'
export const getTemplateUrl = (templateId) => `/template/${templateId}`
