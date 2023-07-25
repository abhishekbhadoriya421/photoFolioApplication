import { useState, useEffect } from "react";
import AlbumsListComponent from "./Components/AlbumsList/AlbumsListComponent";
import Navbar from "./Components/Navbar/NavbarComponent";
import ImageListContainer from "./Components/ImageList/ImageListContainer";
// DataBase
// Import database
import { collection,onSnapshot, getDocs} from "firebase/firestore"; 
import {db} from './firebaseInIt';

function App() {
  // show album let us know show album or image container
  const [showAlbum,setShowAlbum] = useState('album');
  const [albums,setAlbums] = useState([]);
  const [imageId,setImageId] = useState(false);
  const [albumImages,setAlbumImages] = useState("");
      // Retrieve all Albums from database
  useEffect(()=>{
    onSnapshot(collection(db,'album'),(snapShot)=>{
      const data = snapShot.docs.map((doc)=>{
        return {
          id:doc.id,
          ...doc.data()
        }
      })
      setAlbums(data);
    })
  },[]);

  const handleShowUserImage = (id)=>{
    setImageId(id);
  }

  useEffect(()=>{
    async function fetchImageData(){
      try{
        const querySnapshot = await getDocs(collection(db,'album'));
        querySnapshot.forEach((doc)=>{
          if(doc.id === imageId){
            setAlbumImages(doc.data());
            setShowAlbum('image');
          }
        })
      }catch(err){
        console.log(err)
      }
    }
    fetchImageData();
  },[imageId]);

  console.log(albumImages);
    return (
    <div className="App">
      <div className="navbarContainer">
        <Navbar/>
      </div>
      <div className="AlbumsListComponent">
        {(showAlbum ==='album')?
        <AlbumsListComponent
        albums={albums}
        showUserImageFunc={handleShowUserImage}
        />: false}

        {(showAlbum ==='image')?
          <ImageListContainer/>:
          false
        }

      </div>
    </div>
  );
}

export default App;
