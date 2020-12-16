// Native Imports
import React from 'react';

// Component Imports
import AppButton from '../AppButton';

// Supporting Imports
import {useFormikContext} from 'formik';


const SubmitButton = ({name}) =>{
    const {handleSubmit} = useFormikContext(); 
    return(
        <AppButton name = {name} onPress={handleSubmit} />
    );
}

export default SubmitButton;