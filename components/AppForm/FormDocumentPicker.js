import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import DocumentInputList from '../Document/DocumentInputList';
 
export default function FormDocumentPicker({ name }) {
  //   const [imageUris, setImageUris] = useState([]);
  const { errors, setFieldValue, touched, values } = useFormikContext();
 
  const docUris = values[name];
 
  const handleAddDoc = (uri) => {
    setFieldValue(name, [...docUris, uri]);
  };
  const handleRemoveDoc = (uri) => {
    setFieldValue(
      name,
      docUris.filter((docUri) => docUri !== uri)
    );
  };
  return (
    <>
      <DocumentInputList
        docUris={docUris}
        onAddDoc={handleAddDoc}
        onRemoveDoc={handleRemoveDoc}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
 
// const styles = StyleSheet.create({
//   container: {},
// });
