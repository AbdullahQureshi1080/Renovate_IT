import React from 'react';
import InputText from '../components/TextInput';
import ErrorMessage from "../components/ErrorMessage";
import {useFormikContext} from 'formik';

const AppFormField = ({name, ...otherProps}) =>{
    const {setFieldTouched, touched, handleChange, errors} = useFormikContext(); 
    return(
        <>
        <InputText 
        {...otherProps}
        onBlur={()=> setFieldTouched(name)}
        onChangeText = {handleChange(name)}
                  />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormField;