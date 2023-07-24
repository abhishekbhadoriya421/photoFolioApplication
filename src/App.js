import AlbumsListComponent from "./Components/AlbumsList/AlbumsListComponent";
import Navbar from "./Components/Navbar/NavbarComponent";
// DataBase
// import db from "./firebaseInIt";

function App() {
  return (
    <div className="App">
      <div className="navbarContainer">
        <Navbar/>
      </div>
     
      <div className="AlbumsListComponent">
        <AlbumsListComponent/>
      </div>
    </div>
  );
}

export default App;
