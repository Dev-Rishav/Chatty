const uploadFile = async (file: File, token: string) => {
  try {
    const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8080/api/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Include the auth token in the headers
    },
    body: formData,
  });

  const data = res.json();
  console.log("file uploaded to cloud",data);
  
  return data; // Cloudinary file URL
  } catch (error) {
    console.error("error  occured while uploading file",error);
    throw error;
    
  }
};

export default uploadFile;