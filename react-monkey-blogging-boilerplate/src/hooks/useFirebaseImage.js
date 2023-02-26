import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useFirebaseImage = (
  setValue,
  getValues,
  imageName = null,
  callBack = () => {}
) => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const handleUploadFile = (file) => {
    const storage = getStorage();
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        // switch (error.code) {
        //   case "storage/unauthorized":
        //     // User doesn't have permission to access the object
        //     break;
        //   case "storage/canceled":
        //     // User canceled the upload
        //     break;
        //   case "storage/unknown":
        //     // Unknown error occurred, inspect error.serverResponse
        //     break;
        // }
        toast.error("error!");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          setValue("image", downloadURL);
        });
      }
    );
  };

  const handleResetUpload = () => {
    setProgress(0);
    setImage("");
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadFile(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      "images/" + getValues("image_name") || imageName
    );

    // Delete the file
    // xoa o storage va xoa truong trong table user luon
    callBack && callBack();
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        toast.error("there was an error deleting the image");
      });
  };

  return {
    image,
    setImage,
    progress,
    setProgress,
    handleDeleteImage,
    handleSelectImage,
    handleResetUpload,
  };
};

export default useFirebaseImage;
