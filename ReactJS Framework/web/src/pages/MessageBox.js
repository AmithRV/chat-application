function MessageBox(props) {
    const LoadUserDetails = () => {
    }

    return (<div className="message_box_wrap" onClick={() => { LoadUserDetails() }}>
        <div className='user_img_wrap'>
            <img src={(props.data?.imgUrl) ? (props.data?.imgUrl) : (`./icons/images.jpg`)} alt="" className='user_circle' />
        </div>
        <div className="message_box">
            <div className="user_title"><h4>{(props?.data?.name)?.toUpperCase()}</h4></div>
            <span className="message">{props?.data?.lastMeesage}</span>
        </div>

    </div>)
}

export default MessageBox