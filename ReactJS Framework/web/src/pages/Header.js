function Header(props) {
    return (<>
        <div className="header_wrap">
            <div className="header-subbox_1 column">
                <img src='./icons/align-left.svg' alt='' className='align-left_icon' onClick={() => { props.handleSidebarAction() }} />
                <div className='plus_icon_wrap'>
                    <img src='./icons/plus-icon.svg' alt='' className='plus_icon_img' onClick={() => { props.addNewUser() }} />
                </div>
            </div>

            <div className="header-subbox_2 column">
                <div className="search_box_wrap">
                    <img src='./icons/search.svg' alt='' className='searc_icon' />
                    <input className="search_box" placeholder={`Type your message...`} />
                </div>
            </div>

            <div className="header-subbox_3 column">
                <div style={{ display: 'flex' }}>
                    <span className="message_count">50</span>
                    <img src='./icons/bell.svg' alt='' className='bell_icon' />
                </div>
                <img src='./icons/wifi.svg' alt="" id='wifi-icon' className='user_circle' />
                <img src='./icons/images.jpg' alt="" id='user-img' className='user_circle' />
            </div>
        </div>
    </>
    )
}

export default Header;