import axios from '../helper/axios/axios';
import { useEffect, useState } from "react"

function MessageCanvas(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        axios.get(`/api/messages`)
            .then((response) => {
                setMessages(response.data);
                document.getElementById('message-canvas').scrollTop = document.getElementById('message-canvas').scrollHeight; //to always start at bottom of the message canvas
            })
    }, [props.refresh])

    return (<div id="message-canvas" className="message_canvas" key={props?.key}>
        {
            messages.map((message, index) => {
                return (
                    <div key={index} className={(message.received) ? ('from') : ('to')} >
                        <div className="message_box_content">
                            <img src='./icons/images.jpg' alt="" className='msg_user_icon ' />
                            <h3>{message?.name}</h3>
                        </div>
                        <div className="message_box_body">
                            {message?.message}
                        </div>
                        <div className="message_box_footer">
                            <span><i>{message?.dateStamp}</i></span>
                            <span><i>{message?.timeStamp}</i></span>
                        </div>
                    </div>
                )
            })
        }
    </div>)
}

export default MessageCanvas