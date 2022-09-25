import BottomMenu from "./BottomMenu"
import MessageBox from "./MessageBox"
import MessageCanvas from "./MessageCanvas"
import { useEffect, useState } from 'react'
import axios from "../helper/axios/axios.js"

function AppBody(props) {
    const [users, setUsers] = useState([]);

    const getUSers = () => {
        axios.get(`/api/users`)
            .then((response) => {
                console.log('USER : ', response.data);
                setUsers(response.data)
            })
    }

    useEffect(() => {
        getUSers();
    }, [props.refresh])

    return (<>
        <div className="body_canvas">
            {
                (props.sidebar_visible) ? (<div className="sidebar_wrap">
                    {
                        users.map((user, index) => {
                            return (<MessageBox key={index} data={user} />)
                        })
                    }
                </div>) : (<></>)
            }

            <>
                {
                    (props.screenWidth < 768 && props.sidebar_visible) ? (<>
                    </>) : (<>
                        {props.screenWidth < 768 && !props.sidebar_visible && <div className="message-canvas">
                            <MessageCanvas />
                            <BottomMenu />
                        </div>}
                    </>)
                }

                {
                    (props.screenWidth > 768) ? (<>
                        <div className="message-canvas">
                            <MessageCanvas refresh={props.refresh} />
                            <BottomMenu />
                        </div>
                    </>) : (<></>)
                }

            </>
        </div>

    </>)
}

export default AppBody