// Native Imports
import React from 'react';
import AppTextInput from '../AppTextInput';
import ErrorMessage from "./ErrorMessage";

// Supporting Imports
import {useFormikContext} from 'formik';

const AppFormField = ({name, value, ...otherProps}) =>{
    const {setFieldTouched, touched, handleChange, errors,values} = useFormikContext(); 
    return(
        <>
        <AppTextInput 
        {...otherProps}
        onBlur={()=> setFieldTouched(name)}
        onChangeText = {handleChange(name)}
        value={values.value}
                  />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormField;