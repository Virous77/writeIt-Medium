import React, { useState } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const useUploadImge = () => {
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setIsLoading(false);
          toast.success("Image uploaded successfully!!");
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);

    deleteObject(deletRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      toast.success("Image deleted successfully!");
    });
  };

  return {
    uploadImage,
    imageAsset,
    isLoading,
    deleteImage,
  };
};

export default useUploadImge;
