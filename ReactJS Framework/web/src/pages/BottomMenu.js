import moment from 'moment';
import { useState } from 'react';
import axios from '../helper/axios/axios';

function BottomMenu() {
    const [message, setMessage] = useState();

    const HandleMessageSend = () => {
        axios.post(`http://localhost:8000/api/new`, {
            message: message,
            name: "arjun",
            dateStamp: moment().format('YYYY-MMM-DD'),
            timeStamp: moment().format("hh:mm a"),
            received: true
        }).then(() => {
            setMessage();
        }).catch((error) => {
            alert('something went wrong');
        })
    }

    return (<div className="bottom_menu">
        <div className="smile_wrap">
            <img src='./icons/smile.svg' alt='' className='searc_icon' />
        </div>

        <div className='text_box'>
            <input value={message ? message : ''} onChange={(e) => { setMessage(e.target.value) }} className="text_pad" placeholder="Type your message ..." />
            <img src='./icons/send.svg' alt='' className='send_icon' onClick={() => { HandleMessageSend() }} />
        </div>

        <div className="message_tools">
            <img src='./icons/microphone.svg' alt='' className='searc_icon' />
            <img src='./icons/paper-clip.svg' alt='' className='searc_icon' />
            <img src='./icons/photo.svg' alt='' className='searc_icon' />
        </div>
    </div>)
}
export default BottomMenu