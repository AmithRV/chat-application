import axios from "../helper/axios/axios.js"
import { useState } from 'react'
import moment from "moment/moment.js";

function AddUserModal(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [loadin, setLoading] = useState(false);

    const HandleSubmit = () => {
        setLoading(true);
        axios.post(`http://localhost:8000/api/add-user`, {
            name: name,
            email: email,
            createAt: moment().format('YYYY-MMM-DD'),
            lastMeesage: 'hello',
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfQDtO0vJ3KM0JqHV8YiRSgW-B4u71jkrrhw&usqp=CAU"

        })
            .catch((error) => {
                alert('somethig went wrong')
            }).finally((e) => {
                setLoading(false);
                props.onRefreshAction();
                props.onCloseAction();
            })
    }

    return (<>
        <div className="add_user_wrap">
            <div className="add_user_modal">
                <div className="close_icon_wrap">
                    <img src="./icons/close-icon.svg" className="close_icon_wrap_img" alt='' onClick={() => { props.onCloseAction() }} />
                </div>
                <>
                    <div className="add_user_modal_box1">
                        <label>NAME : </label>
                        <input type={'text'} onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                    <div className="add_user_modal_box1">
                        <label>EMAIL : </label>
                        <input type={'text'} onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div className="add_user_modal_box2">
                        <button className="button_ cancel_button" onClick={() => { props.onCloseAction() }}>Cancel</button>
                        <button className="button_ submit_button" onClick={() => { HandleSubmit() }} disabled={loadin}>{loadin ? 'loading...' : 'Add'}</button>
                    </div>
                </>
            </div>
        </div>
        <div className="background_blur"></div>
    </>)
}

export default AddUserModal