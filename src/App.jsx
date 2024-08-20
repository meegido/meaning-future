import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDocuments(db) {
  const linkColection = collection(db, 'link');
  const linkDocuments = await getDocs(linkColection);
  const linksList = linkDocuments.docs.map(doc => doc.data());
  return linksList;
}

const links = await getDocuments(db)

function App() {
  const [count, setCount] = useState(1)
  

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
