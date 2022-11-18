import { useEffect, useState } from 'react';
import './App.css';
// import 'antd/dist/antd.css';

// import 'antd/dist/antd.css';

import './todomvc.base.css';
import './todomvc.index.css';


// 90% create by ai
// chat rooms component list
function ChatRoomsList({ rooms, selectedRoomId, onSelectRoom }) {
  return (
    <div className="chat-rooms-list">
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className={room.id === selectedRoomId ? 'selected' : ''}
          >
            <div onClick={() => onSelectRoom(room.id)}>
              {room.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 100% create by ai
function initRooms() {
 
  const rooms = [
    { id: 1, name: '聊天室1' },
    { id: 2, name: '聊天室2' },
    { id: 3, name: '聊天室3' },
    { id: 4, name: 'Room 4' },
    { id: 5, name: 'Room 5' },
    { id: 6, name: 'Room 6' },
    { id: 7, name: 'Room 7' },
    { id: 8, name: 'Room 8' },
  ];
  window.localStorage.setItem('http://localhost:3001/rooms', JSON.stringify(rooms));
}

// 70% create by ai
function initMessages() {
  const messages = [
    { id: 1, roomId: 1, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao1' },
      { id: 2, content: '卧槽', type: 'text', user: 'yangtao2' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 2, roomId: 2, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao3' },
      { id: 2, content: '卧槽', type: 'text', user: 'yangtao4 ' },  
      { id: 3, content: '牛逼', type: 'text', user: 'me' }, 
    ] },
    { id: 3, roomId: 3, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao5' },
      { id: 2, content: '卧槽', type: 'text', user: 'yangtao6   ' },  
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 4, roomId: 4, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao7' },
      { id: 2, content: '卧槽', type: 'text', user: 'yangtao8' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 5, roomId: 5, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao9' },
      { id: 2, content: '卧槽', type: 'text', user: 'yangtao10 ' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 6, roomId: 6, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao11' },
      { id: 2, content: '卧槽', type: 'text', user: 'lisi ' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 7, roomId: 7, content:  [
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao12' },
      { id: 2, content: '卧槽', type: 'text', user: 'lisi ' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    { id: 8, roomId: 8, content:  [ 
      { id: 1, content: '你好啊', type: 'text', user: 'yangtao13' },
      { id: 2, content: '卧槽', type: 'text', user: 'lisi ' },
      { id: 3, content: '牛逼', type: 'text', user: 'me' },
    ] },
    
  ]
  window.localStorage.setItem('http://localhost:3001/messages', JSON.stringify(messages));
}

initRooms();
initMessages();

// 80% create by ai 
function mockFetch(opts = {url: '', method: 'get', data: null}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (opts.method === 'get') {
        resolve(JSON.parse(window.localStorage.getItem(opts.url)));
      } else {
        const reset = JSON.parse(window.localStorage.getItem(opts.url));
        const d = JSON.stringify([...reset, opts.data]);
        window.localStorage.setItem(opts.url, d);
        resolve(d);
      }
    }, 30);
  });
}


// 70% create by ai
function App() {

  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  
  // create by ai
  // fetch chat rooms
  useEffect(() => {
    mockFetch({
      url: 'http://localhost:3001/rooms',
      method: 'get'
    })
      .then((rooms) => {
        setRooms(rooms);
        setSelectedRoomId(rooms[0].id);
        setNewRoomName(rooms[0].name);
        
        mockFetch({
          url: 'http://localhost:3001/messages',
          method: 'get'
        })
          .then((messages) => {
            setMessages(messages.find((message) => message.roomId === rooms[0].id).content);
          }
        );
      });
  }, []);


  // 100% create by ai 
  function onSelectRoom(roomId) {
    setSelectedRoomId(roomId);
    setNewRoomName(rooms.find((room) => room.id === roomId).name);
    mockFetch({
      url: 'http://localhost:3001/messages',
      method: 'get'
    })
      .then((messages) => {
        setMessages(messages.find((message) => message.roomId === roomId).content);
      }
    );
  }

  // 60% create by ai
  function addMessage(e) {
   
    if (e.code === 'Enter') {
      if (e.target.value.trim() === '') {
        return;
      }
      var value = e.target.value;
      const newMessage = { 
        id: messages.length + 1,
        content: value,
        type: 'text',
        user: 'me'
      };
      setMessages([...messages, newMessage]);
      setNewMessage('');
      e.target.value = '';
      mockFetch({
        url: 'http://localhost:3001/messages',
        method: 'post',
        data: {
          id: messages.length + 1,
          roomId: selectedRoomId,
          content: newMessage,
        }
      });
      
        
    }
  
  }
  

  

  // 50% create by ai
  return (
    <div className='chat'>
      <div className='chat__rooms'>
        <ChatRoomsList rooms={rooms} selectedRoomId={selectedRoomId}  onSelectRoom={onSelectRoom}  />
      </div>
      <div className='chat__content'>
        <div className='chat__title'>{newRoomName}</div>
        <div className='chat__messages'>
          {
            messages.map((message) => (
              <div className={message.user === 'me' ? 'chat__message chat__me': 'chat__message'} key={message.id}>
                <div className='chat__message__user'>{message.user}</div>
                <div className='chat__message__content'>{message.content}</div>
              </div>
            ))
          }
        </div>
        <div className='chat__edit'>
          <textarea onKeyDown={addMessage}></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
