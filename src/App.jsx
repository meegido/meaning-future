import { useEffect, useState } from 'react'
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [count, setCount] = useState(0)
  const [links, setlinks] = useState([])

  useEffect(() => {
    const getDocuments = async () => {
      const linkCollection = collection(db, 'links');
      const linkDocuments = await getDocs(linkCollection);
      const links = linkDocuments.docs.map(doc => doc.data());
      
      setlinks(links)
      setCount(links.length)
    }

    getDocuments()
  }, [])
  
  return (
    <div style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        width: 1280
      }}  >
      <h1>Hello World!</h1>
      {links.map((link) =>
        <p key={link.id} style={{textAlign: "center"}}>{link.url}</p> 
      )}
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          There is {count} url for now 😎
        </button>
      </div>
    </div>
  )
}

export default App
