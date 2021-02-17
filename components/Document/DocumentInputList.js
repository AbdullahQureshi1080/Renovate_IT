import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import DocumentInput from "./DocumentInput";
// import ImageInput from "./ImageInput";
 
export default function DocumentInputList({
  docUris = [],
  onRemoveDoc,
  onAddDoc,
}) {
  const scrollView = useRef();
 
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal={true}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {docUris.map((uri) => (
            <View style={styles.image} key={uri}>
              <DocumentInput
                docUri={uri}
                onChangeDoc={() => onRemoveDoc(uri)}
              />
              {/* <Text>{uri}</Text> */}
            </View>
          ))}
          <DocumentInput onChangeDoc={(uri) => onAddDoc(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  image: {
    marginRight: 10,
  },
});
 
