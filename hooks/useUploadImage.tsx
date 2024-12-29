import { v4 as uuidv4 } from "uuid";

import { MAIN_SERVER_URL, MAIN_CHAT_SERVER_URL } from "../constants/urls";

interface UseUploadImageReturns {
  uploadImage: (
    imageUri: string,
    fileExtension: string,
    studentID: string
  ) => Promise<{ imageURL: string } | null>;
  uploadChatImage: (
    imageUri: string,
    fileExtension: string,
    chatId: string
  ) => Promise<{ imageURL: string; thumbnailURL: string } | null>;
}

async function uploadImage(
  imageUri: string,
  fileExtension: string,
  studentID: string
): Promise<{ imageURL: string } | null> {
  try {
    const formattedStudentID = studentID.replace(/[-]/g, "_"); // Using [] in case additional characters need to be replaced later
    const fileBuffer = await fetch(imageUri).then((res) => res.blob());
    const formData = new FormData();
    formData.append(
      "image/" + fileExtension,
      new Blob([fileBuffer]),
      `${formattedStudentID}.${fileExtension}`
    );

    const response = await fetch(`${MAIN_SERVER_URL}/students/update/image`, {
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      imageURL: data.imageURL,
    };
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
}

async function uploadChatImage(
  imageUri: string,
  fileExtension: string,
  chatId: string
): Promise<{ imageURL: string; thumbnailURL: string } | null> {
  try {
    const uuid = uuidv4();
    const formattedUUID = uuid.replace(/[-]/g, "_"); // Using [] in case additional characters need to be replaced later
    const formattedChatID = chatId.replace(/[-]/g, "_"); // Using [] in case additional characters need to be replaced later
    const imageId = `${formattedChatID}__${formattedUUID}`;
    const fileBuffer = await fetch(imageUri).then((res) => res.blob());
    const formData = new FormData();
    formData.append(
      "image/" + fileExtension,
      new Blob([fileBuffer]),
      `${imageId}.${fileExtension}`
    );

    // use sharp library to resize image on server
    const response = await fetch(`${MAIN_CHAT_SERVER_URL}/chats/upload/image`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
    // const response = await fetch(`http://localhost:11115/chats/upload/image`, {
    //   method: "POST",
    //   body: formData,
    // });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      imageURL: data.image_url,
      thumbnailURL: data.thumbnail_url,
    };
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
}

const useUploadImage = (): UseUploadImageReturns => ({
  uploadImage,
  uploadChatImage,
});

export default useUploadImage;
