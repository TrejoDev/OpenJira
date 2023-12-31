import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from '../../context/entries/EntriesContex';
import { UIContext } from "@/context/ui";

import { EntryCard } from ".";
import { EntryStatus } from "@/interfaces";
import styles from './EntryList.module.css'

interface  Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  
  const { entries, updateEntry } = useContext( EntriesContext );
  const { isDragging, setIsDragging } = useContext( UIContext );

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status  ), [ entries ] );
  
const allowDrop = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault(); 
}

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    
    const entry = entries.find( e => e._id === id )!;
    entry.status = status;
    updateEntry( entry );
    setIsDragging( false );
  }

  return (
    // todo: hacer drop
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
            {/* todo: cambiara si estoy haciendo drag */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                {
                  entriesByStatus.map( entry => (
                    <EntryCard key={ entry._id } entry={ entry } />
                  ))
                }
            </List>

        </Paper>
    </div>
  )
}