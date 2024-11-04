import { TimePicker } from 'antd';
import {useState} from "react";


const TimePicker = () => {

    const [value, setValue] = useState(null);
    const onChange = (time) => {
        setValue(time);
        console.log(time);
    };

    return (
        <TimePicker value={value} onChange={onChange} />
    );
};

export default TimePicker;