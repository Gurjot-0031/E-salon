import React, {useState} from 'react';
import AvailableTimes from 'react-available-times';

function MyDateTimePicker(props) {
    const [selectedRange,setSelectedRange] = useState(
        {
            start: '',
            end: ''
        }
    );


    return (
        <div>

                {props.alreadyBooked.map(item=><p>{item.startDateTime}</p>)}

            <AvailableTimes
                weekStartsOn="monday"
                onChange={(selections) => {
                    selections.forEach(({ start, end }) => {
                        selectedRange.start=start;
                        selectedRange.end=end;
                        //console.log('Start:', selectedRange.start, 'End:', selectedRange.end);
                    })
                }}
                // onEventsRequested={({ calendarId, start, end, callback }) => {
                //     loadMoreEvents(calendarId, start, end).then(callback);
                // }}
                // initialSelections={[
                //     { start: aDateObject, end: anotherDateObject }
                // ]}
                initialSelections={
                    props.alreadyBooked.map(rangeItem =>  {
                        console.log(new Date(rangeItem.startDateTime))
                            return {
                                start:new Date(rangeItem.startDateTime),
                                end:new Date(rangeItem.endDateTime)
                            }
                        })
                }
                height={400}
                recurring={false}
                availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday']}
                availableHourRange={{ start: 10, end: 19 }}
            />
        </div>
    );
}



export default MyDateTimePicker;