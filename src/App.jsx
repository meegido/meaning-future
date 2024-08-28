import { useEffect, useState } from 'react'
import './app.style.module.jsx';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase_config';
import { Link } from './Link/link';
import { Main, MainWrapper, Header } from './app.style.module'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [count, setCount] = useState(0)
  const [links, setlinks] = useState([])
  const [bgImage, setBgImage] = useState("")

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


  const handleLinkHover = (image) => {
    console.log(image, "image detro")
    const newBgImage = image;
    setBgImage(newBgImage)
  }
  
  return (
    <div style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }}>
      <Header>
        <h1>Meaning future</h1>
      </Header>
      <Main>
        <MainWrapper>
        {links.map((link) =>
          <Link
            key={link.id}
            serviceIcon={link.serviceIcon}
            url={link.url}
            title={link.title}
            text={link.text}
            onHover={() => handleLinkHover(link.imageUrl)}
          />
        )}
        </MainWrapper>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            There is {count} url for now 😎
          </button>
        </div>
      </Main>
    </div>
  )
}

export default App
