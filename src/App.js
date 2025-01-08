import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Appel from './page/appel/Appel';
import Archive from './page/archive/Archive';
import Important from './page/important/Important';
import Message from './page/message/Message';
import Parametre from './page/parametre/Parametre';
import Status from './page/status/Status';
import Index from './component/index/Index';
import Publication from './page/publications/Publication';
import Ami from './page/amis/Ami';
import Profil from './page/profil/Profil';
import Groupe from './page/groupe/Groupe';
import { useState } from 'react';
import WrittingPublication from './page/publications/WrittingPublication';
import Call from './component/contain/Call';
import Video from './component/contain/Video';




function App() {
  const [layout, setlayout] = useState({
    left: "20%",
    center: "50%",
    right: "30%"
  })
  const addwith = () => {
    setlayout({left: "10%",center: "70%",right: "20%"})
  }
  const addwiths = () => {
    setlayout({left: "20%",center: "60%",right: "20%"})
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div className="IndexLeft" style={{width: layout.left}}>
          <Index UpdateWidth={addwith} UpdateWidths={addwiths}/>
        </div>
        <div className="IndexCenter" style={{width: layout.center}}>
        <Routes>
          <Route path="/" element={<Publication />} />
          <Route path="appel" element={<Appel />} />
          <Route path="message" element={<Message />} />
          <Route path="status" element={<Status />} />  
          <Route path="amis" element={<Ami />} />
          <Route path="archive" element={<Archive />} />
          <Route path="important" element={<Important />} />
          <Route path="parametre" element={<Parametre />} />
          <Route path="profil" element={<Profil />} />
          <Route path="groupe" element={<Groupe/>} />
          <Route path="writepublication" element={<WrittingPublication/>} />
          <Route path="appelusers" element={<Call/>} />
          <Route path="appelvideos" element={<Video/>} />
        </Routes>
        </div>  
        <div className="IndexRight" style={{width: layout.right}}>
          <Profil/>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;