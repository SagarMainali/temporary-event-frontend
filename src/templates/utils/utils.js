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

// upload image to cloudinary directly
export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET);

    // using fetch here since default axios behavior are modified 
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    return data.secure_url;
};
