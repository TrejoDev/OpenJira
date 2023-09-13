import { Inter } from 'next/font/google'

import { Card, CardHeader, Grid } from '@mui/material'

import { Layout } from '@/components/layouts'
import { EntryList, NewEntry } from '@/components/UI'


const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {


  return (
    <Layout title='Home - OpenJira'>
     <Grid container spacing={ 2 }>
      
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Outstanding' />
                  {/* Agregar una nueva entrada */}
              <NewEntry />
              <EntryList status={'pending'} />
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />
                  {/* Agregar una nueva entrada */}
              <EntryList status={'in-progress'}/>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />
                  {/* Agregar una nueva entrada */}
              <EntryList status={'finished'}/>
          </Card>
        </Grid>

     </Grid>
    </Layout>
  )
}
