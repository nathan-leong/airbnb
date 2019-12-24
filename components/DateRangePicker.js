import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import {DateUtils } from 'react-day-picker'
import {useStoreActions, useStoreState} from 'easy-peasy'

const DateRangePicker = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    const startDate = useStoreState(state => state.bookingDates.startDate)
    const endDate = useStoreState(state => state.bookingDates.endDate)
    const setStartDate = useStoreActions(actions => actions.bookingDates.setStartDate)
    const setEndDate = useStoreActions(actions => actions.bookingDates.setEndDate)
    const setTotalNights = useStoreActions(actions => actions.bookingDates.setTotalNights)

    const numberOfNightsBetweenDates = (startDate,endDate) => {
        if (!startDate || !endDate) return 0
        const start = new Date(startDate)
        const end = new Date(endDate)
        let dayCount = 0

        while (end > start) {
            dayCount++
            start.setDate(start.getDate() + 1)
        }
        setTotalNights(dayCount)
        return dayCount
    }
    const parseDate = (str, format, locale) => {
        const parsed = dateFnsParse(str, format, new Date(), { locale})
        return DateUtils.isDate(parsed) ? parsed : null
    }
    const formatDate = (date,format,locale) => dateFnsFormat(date, format, { locale })

    const format = 'dd MMM yyyy'
    const content = (
        <div className='date-range-picker-container'>
        <div>
            <label>From:</label>
            <DayPickerInput 
                formatDate={formatDate}
                format={format}
                parseDate={parseDate}
                value={startDate}
                placeholder={`${dateFnsFormat(new Date(), format)}`}
                dayPickerProps={{
                    modifiers: {
                        disabled: 
                        {
                            before: new Date()
                        }
                    }
                }}
                onDayChange={day => {
                    setStartDate(day)
                    if (numberOfNightsBetweenDates(day,endDate) < 1) {
                        const newEndDate = new Date(day)
                        newEndDate.setDate(newEndDate.getDate() + 1)
                        setEndDate(newEndDate)
                        setTotalNights(1)
                    }
                }}
            />
        </div>
        {startDate && ( 
            <div>
                <label>To:</label>
                <DayPickerInput 
                    formatDate={formatDate}
                    format={format}
                    parseDate={parseDate}
                    value={endDate}
                    placeholder={`${dateFnsFormat(tomorrow, format)}`}
                    dayPickerProps={{
                        modifiers: {
                            disabled: [
                                startDate,
                                {
                                    before: tomorrow
                                }
                            ]
                        }
                    }}
                    onDayChange={day => {
                        setEndDate(day)
                        numberOfNightsBetweenDates(startDate,day)
                    }}
                />
            </div>
        )}

        <style jsx>{`
            .date-range-picker-container div {
                display: grid;
                border: 1px solid #ddd;
                grid-template-columns: 30% 70%;
                padding: 10px;
            }
            label {
                padding-top: 10px;
            }
        `}</style>
        <style jsx global>{`
            .DayPickerInput input {
                width: 120px;
                padding: 10px;
                font-size: 16px;
            }
        `}</style>
    </div>
    )
    return content
}

export default DateRangePicker