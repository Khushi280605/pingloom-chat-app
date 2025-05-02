const upload = async (file) => {
  return new Promise(async (resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_profiles"); // Your upload preset
    data.append("cloud_name", "drbou2ho4"); // Your Cloudinary cloud name

    try {
      // Upload image to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drbou2ho4/image/upload", // Cloudinary image upload endpoint
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.secure_url) {
        // Return the image URL if upload is successful
        resolve(result.secure_url);
      } else {
        reject("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      reject(error); // Reject if there is an error
    }
  });
};

export default upload;
