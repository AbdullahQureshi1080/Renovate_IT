// Native Imports
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

// Supporting Imports
import {Formik} from "formik";

const AppForm= ({initialValues,onSubmit,validationSchema,children}) =>{
    return (
        <Formik
          initialValues={initialValues}
          onSubmit = {onSubmit}
          validationSchema = {validationSchema}
          > 
          {
              ()=>(
                  <>
                  {children}
                  </>
              )
          }</Formik>
    )
}

const styles = StyleSheet.create({})
export default AppForm;