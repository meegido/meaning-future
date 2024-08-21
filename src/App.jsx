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
      const links = linkDocuments.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
      });
     
      // console.log(links, "links")

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
        <div key={link.id} style={{textAlign: "center", paddingBottom: 24}}>
          <p>{link.url}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <img style={{width: 20, height: 20 }} alt="Service icon" src={link.serviceIcon} />
            <p>{link.service}</p>
          </div>
          <p>{link.title}</p>
          <p>{link.text}</p>
          <img style={{width: 200, height: 200, borderRadius: 8 }} alt="Image" src={link.imageUrl} />
        </div>
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
