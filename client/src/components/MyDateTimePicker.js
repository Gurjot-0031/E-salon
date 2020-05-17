import React, {useState} from 'react';
import AvailableTimes from 'react-available-times';
import DatePicker from "react-datepicker";
import TimePicker from "react-datepicker";

function MyDateTimePicker() {
    const [selectedDate,setSelectedDate] = useState(
        new Date()
        // setHours(setMinutes(new Date(), 30), 17)
    );


    return (
        <div>
            <AvailableTimes
                weekStartsOn="monday"
                // calendars={[
                //     {
                //         id: 'work',
                //         title: 'Work',
                //         foregroundColor: '#ff00ff',
                //         backgroundColor: '#f0f0f0',
                //         selected: true,
                //     },
                //     {
                //         id: 'private',
                //         title: 'My private cal',
                //         foregroundColor: '#666',
                //         backgroundColor: '#f3f3f3',
                //     },
                // ]}
                onChange={(selections) => {
                    selections.forEach(({ start, end }) => {
                        console.log('Start:', start, 'End:', end);
                    })
                }}
                // onEventsRequested={({ calendarId, start, end, callback }) => {
                //     loadMoreEvents(calendarId, start, end).then(callback);
                // }}
                // initialSelections={[
                //     { start: aDateObject, end: anotherDateObject }
                // ]}
                height={400}
                recurring={false}
                availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday']}
                availableHourRange={{ start: 10, end: 19 }}
            />
        </div>
    );
}



export default MyDateTimePicker;