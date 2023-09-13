import { ChangeEvent, useContext, useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
    
    const { addNewEntry } = useContext( EntriesContext );
    const {  setIsAddingEntry, isAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);


    const onTextFieldChanges = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    };

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        addNewEntry(inputValue );
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
        
        {
            isAddingEntry ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2 , marginBottom: 1 }}
                        placeholder="New entry"
                        autoFocus
                        multiline
                        label='New entry'
                        helperText={  inputValue.length <= 0 && touched && 'Enter a value'} 
                        error={  inputValue.length <= 0 && touched}
                        value={ inputValue }
                        onChange={ onTextFieldChanges }
                        onBlur={ () => setTouched( true ) }
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant="text"
                            onClick={ () => setIsAddingEntry( false ) }
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={ <SaveOutlinedIcon /> }
                            onClick={ onSave }
                        >
                            Save
                        </Button>
                    </Box>  
                </>
            ) 
            : (
                <Button
                    startIcon={ <AddCircleOutlineOutlinedIcon /> }
                    fullWidth
                    variant="outlined"
                    onClick={ () => setIsAddingEntry(true) }
                >
                    Add task
                </Button>
            )
        }
    </Box>
  )
}
