import React, {useState} from 'react';

function MyDateTimePicker(props) {
    const [selectedRange,setSelectedRange] = useState(
        {
            selectedDate:'',
            selectedMonth:'',
            selectedYear:'',
            start: '',
            end: ''
        }
    );

    let temp = [];
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let today = new Date();
    let dateToday = today.getDate();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    for (let i = 0; i < 8; i++) {
        temp.push(new Date(thisYear,thisMonth,dateToday+i));
    }


    function showAvailabilities(date,month,year) {
        //alert("sdkfbgl")
        setSelectedRange({
            selectedDate: date,
            selectedMonth: month,
            selectedYear: year,
            start:"45",
            end:"56"}
            )

    }

    return (
        <div className={"row"}>
                {
                    temp.map(item =>
                        <button className="col s3"
                        onClick={
                            (e) =>
                                showAvailabilities(item.getDate(),item.getMonth(),item.getYear(),e)}>
                            {item.getDate() +"-"+ monthNames[item.getMonth()]}
                        </button>

                    )
                }

                {(selectedRange.selectedDate)
                    ? <div>Slots available for
                        {
                            " "+selectedRange.selectedDate +"-"+ monthNames[selectedRange.selectedMonth]
                        }
                      </div>
                    : null}
        </div>
    );
}



export default MyDateTimePicker;