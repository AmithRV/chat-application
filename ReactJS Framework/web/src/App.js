import React, { useEffect, useState } from "react";
import "./App.css";
import AddUserModal from "./components/AddUserModal";
import AppBody from "./pages/AppBody";
import Header from "./pages/Header";
import Pusher from "pusher-js";

export default function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [screenWidth, setSereenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [showAddUserModal, setAhowAddUserModal] = useState(false);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setSereenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);

    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    const pusher = new Pusher('fb9820d492eae1a63e41', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      // alert(JSON.stringify(data));
      setRefresh(!refresh)
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [refresh]);


  const handleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }
  return (<>
    <div className="app">
      <div className="app_layout">
        <Header handleSidebarAction={handleSidebar} screenWidth={screenWidth} screenHeight={screenHeight} addNewUser={() => { setAhowAddUserModal(true) }} />
        <AppBody sidebar_visible={isSidebarVisible} screenWidth={screenWidth} screenHeight={screenHeight} refresh={refresh} onRefreshAction={() => { setRefresh(!refresh) }} />
      </div>
      {showAddUserModal && <AddUserModal onCloseAction={() => { setAhowAddUserModal(false) }} onRefreshAction={() => { setRefresh(!refresh) }} />}

    </div>
  </>
  );
}