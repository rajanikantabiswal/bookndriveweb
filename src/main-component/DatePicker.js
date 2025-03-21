import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page } from '@mobiscroll/react';



function App() {
    return (
        <Page>
           
            
            <Datepicker
                controls={['datetime']}
                select="range"
                inputProps={{
                    label: 'Date & Time',
                    labelStyle: 'stacked',
                    inputStyle: 'outline',
                    placeholder: 'Please Select...'
                }}
            />
            
        </Page>
    ); 
}


export default App;