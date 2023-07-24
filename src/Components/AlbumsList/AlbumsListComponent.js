import styled from './AlbumsList.module.css'
import { useEffect, useRef, useState} from 'react';

// Import database
import { collection,onSnapshot, addDoc } from "firebase/firestore"; 
import {db} from '../../firebaseInIt';


// Add Form Component
function Form(){
    const [albumName,setAlbumName] = useState("");
    let addAlbumRef = useRef();
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

    return(
        <div className={styled.addAlbumFormContainer}>
            <p className={styled.AlbumHeading}>Create An Album</p>
            <form className={styled.addAlbumForm} onSubmit={handleAddAlbum}>
                <input type="text" name='albumName' ref={addAlbumRef} className={styled.addAlbumInput} placeholder='Enter Album Name' required />
                <div className={styled.buttons}>
                    <button className={styled.btn}
                    style={{color:"white",background:"green"}}
                    type='submit'
                    >Create</button>
                    <button className={styled.btn} style={{color:"white",background:"red"}} type='reset'>Clear</button>
                </div>
            </form>
        </div>
    )
}

function AlbumsListComponent(){
    const [showForm,setShowForm] = useState(false);
    const [albums,setAlbums] = useState([]);

    function handleShowForm(){
        setShowForm(!showForm);
    }

    // Retrieve all Albums from database
    useEffect(()=>{
        onSnapshot(collection(db,'album'),(snapShot)=>{
            const data = snapShot.docs.map((doc)=>{
                return {
                    id:doc.id,
                    ...doc.data()
                }
            })
            console.log(data);
        })
    })

    return(<>
        {/* main Album container  */}
        <section className={styled.AlbumsContainer}>
            {/* Form will be display if showForm is True*/}
                {showForm && <Form/>}
            {/* Add Album Form Button And Heading */}
            <div className={styled.addAlbumFormBtnAndHeading}>
                <p className={styled.AlbumHeading}>Your Albums</p>
                {(showForm)? 
                    <button className={styled.addAlbumBtn} style={{background:"red",color:"white",border:'0px'}} onClick={handleShowForm}>Cancel</button>
                    :
                    <button className={styled.addAlbumBtn} onClick={handleShowForm}>Add Album</button>
                }

            </div>
        </section>
    </>)
}

export default AlbumsListComponent;