import React from 'react';
import {useFormikContext} from 'formik';
import AppButton from './AppButton';

const SubmitButton = ({name}) =>{
    const {handleSubmit} = useFormikContext(); 
    return(
        <AppButton name = {name} onPress={handleSubmit} />
    );
}

export default SubmitButton;