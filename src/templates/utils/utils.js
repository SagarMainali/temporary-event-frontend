export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

// prioritize section data from localstorage over defaultSection data(fetched from db)
export function getSectionData(localStorageKey, defaultSection) {
    try {
        const raw = localStorage.getItem(localStorageKey);
        if (!raw) {
            console.log(`🚀 ~ getSectionData ~ ${localStorageKey} ❌❌❌:", "Section data not found in localstorage. So using section data fetched from database.`)
            return defaultSection;
        }

        const parsed = JSON.parse(raw);
        console.log(`🚀 ~ getSectionData ~ ${localStorageKey}✅✅✅:", "Section data found in localstorage.`)
        return parsed;
    } catch (error) {
        console.error(`Returning defaultSection data because failed to parse localStorage data for key: ${localStorageKey}`, error);
        return defaultSection;
    }
}

// scroll to certain section
export const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    console.log("scrolling to:::", sectionId)
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };