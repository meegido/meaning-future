import { useEffect, useState } from 'react'
import './app.style.module.jsx';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase_config';
import Link from './Link/link';
import { Main, Header } from './app.style.module'

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
    <>
      <Header>
        <h1>Meaning future</h1>
      </Header>
      <Main>
        {links.map((link) =>
          <Link
            key={link.id}
            serviceIcon={link.serviceIcon}
            url={link.url}
            title={link.title}
            text={link.text}
            bgImage={link.imageUrl}
          />
        )}
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            There is {count} url for now 😎
          </button>
        </div>
      </Main>
    </>
  )
}

export default App
