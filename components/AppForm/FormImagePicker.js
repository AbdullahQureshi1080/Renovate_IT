import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import ImageInputList from "../Image/ImageInputList";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

export default function FormImagePicker({ name }) {
  //   const [imageUris, setImageUris] = useState([]);
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const imageUris = values[name];

  const handleAddImage = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemoveImage = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
