import styled from './AlbumsList.module.css'
import { useState, useRef, useEffect} from 'react';
import {Form} from '../ReuseComponents/Form/Form';
import ShowData from '../ReuseComponents/ShowData/ShowDataComponent';

// Import database
import { collection,addDoc } from "firebase/firestore"; 
import {db} from '../../firebaseInIt';

function AlbumsListComponent(props){
    const [showForm,setShowForm] = useState(false);

    function handleShowForm(){
        setShowForm(!showForm);
    }

    const [albumName,setAlbumName] = useState("");
    let addAlbumRef = useRef();

    // fetch data from Form
    function handleAddAlbum(e){
        e.preventDefault(); // preventing default reloading behavior of form
        setAlbumName(addAlbumRef.current.value);
        addAlbumRef.current.value = "";
    }

    // Adding Data in Database
    useEffect(()=>{
        // album must be non empty 
        if(albumName){
            async function addAlbumInDataBase(){
                await addDoc(collection(db,"album"),{
                    albumName: albumName,
                    createOn: new Date(),
                    images: []
                });
            }
            addAlbumInDataBase();
        }
    },[albumName]);

    const {albums,showUserImageFunc} = props
    return(<>
        {/* main Album container  */}
        <section className={styled.AlbumsContainer}>
            {/* Form will be display if showForm is True*/}
                {showForm && 
                <Form formType={"Album"}
                refEle={addAlbumRef}
                handleOnSubmit={handleAddAlbum}
                />}
            {/* Add Album Form Button And Heading */}
            <div className={styled.addAlbumFormBtnAndHeading}>
                <p className={styled.AlbumHeading}>Your Albums</p>
                {(showForm)? 
                    <button className={styled.addAlbumBtn} style={{background:"red",color:"white",border:'0px'}} onClick={handleShowForm}>Cancel</button>
                    :
                    <button className={styled.addAlbumBtn} onClick={handleShowForm}>Add Album</button>
                }

            </div>

            {/* Show Album */}
            <div className={styled.showAlbums}>
                {albums.map((ele)=>{
                    return <ShowData key={ele.id}
                    id={ele.id}
                    image={"https://th.bing.com/th/id/R.bbade8c45f3deaae7ea095172a7b1803?rik=NfGzWKcbN3URzw&pid=ImgRaw&r=0"}
                    content={ele.albumName}
                    handleShowUserImage={showUserImageFunc}
                    /> 
                })}
            </div>        
        </section>
    </>)
}

export default AlbumsListComponent;