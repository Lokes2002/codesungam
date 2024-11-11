export const uploadToCloudnary = async (file, resourceType) => {
    if (!file) {
        console.log("Error from upload function: No file provided");
        return null;
    }

    try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "twit-spare"); // Adjust this preset if needed

        const cloudName = "debtpp9lv"; // Replace with your actual Cloudinary cloud name
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const res = await fetch(url, {
            method: "POST",
            body: data,
        });

        const fileData = await res.json();

        if (fileData.error) {
            console.log("Error from Cloudinary: ", fileData.error.message);
            return null;
        }

        if (fileData.resource_type === 'video') {
            return fileData.secure_url.toString();
        } else {
            return fileData.secure_url || fileData.url;
        }
    } catch (error) {
        console.log("Error during upload to Cloudinary: ", error);
        return null;
    }
};
