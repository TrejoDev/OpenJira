
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next';

import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { dbEntries } from "@/database";
import { Layout } from "@/components/layouts";
import { Entry, EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "@/utils";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];
type Props = {
    entry: Entry
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const router = useRouter();

    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status );
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [ inputValue, touched ])

    const onInputValueChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    };

    const onStatusChange = ( { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setStatus( target.value as EntryStatus )
    }

    const onSave = () => {
        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true )
    }

    const onDelete = () => {    ///// esto modificado
        deleteEntry( entry, true );
        router.push('/')
    }

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 }  sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader 
                        title={`Entry: `}
                        subheader={`Created: ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder="New entry"
                            autoFocus
                            multiline
                            label='New entry'
                            value={ inputValue }
                            onChange={ onInputValueChange }
                            onBlur={ () => setTouched( true ) }
                            helperText={ isNotValid && 'Enter a value'}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado: </FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChange }
                            >
                                {
                                    validStatus.map( (option) => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio /> }
                                            label={ capitalize(option)  }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon /> }
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                    </Card>
            </Grid>
        </Grid>
        <IconButton 
            onClick={ onDelete }
            sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'   //Tomamos colores de nuetro theme
            }}
        >
            <DeleteOutlinedIcon /> 
        </IconButton>
    </Layout>
  )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
 

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;