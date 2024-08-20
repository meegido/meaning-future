import { useEffect, useState } from 'react'
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [count, setCount] = useState(0)
  const [linksData, setLinksData] = useState([])

  useEffect(() => {
    const getDocuments = async () => {
      const linkColection = collection(db, 'link');
      const linkDocuments = await getDocs(linkColection);
      const linksList = linkDocuments.docs.map(doc => doc.data());
      
      setLinksData(linksList)
      setCount(linksList.length)
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
      {linksData.map((link) =>
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
