import { storage } from "@/config/firebase"; // Your firebase initialization file
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file: File) => {
  try {
    // Generate unique filename
    const fileName = `${uuidv4()}-${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `site-logos/${fileName}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};