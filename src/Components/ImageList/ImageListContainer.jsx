import { useEffect, useRef, useState } from "react";
import { Form } from "../ReuseComponents/Form/Form";
import { ShowImage } from "./showImage/ShowImageComponent";
import styled from './imageList.module.css'

import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebaseInIt';

function ImageListContainer(props){
    const [showForm,setShowForm] = useState(false);
    const [newImage,setNewImage] = useState({});
    const [image,setImage] = useState(props.albumImages);
    function handleShowForm(){
        setShowForm(!showForm);
    }

    let imageUrlRef = useRef();
    let imageNameRef = useRef();

    // function to add Image in an album
    function handleAddImage(e){
        e.preventDefault();   

        setNewImage({
            imageUrl:   imageUrlRef.current.value,
            imageName:  imageNameRef.current.value
        })

        imageNameRef.current.value = "";
        imageUrlRef.current.value  = "";
    }

    // Add image in database
    useEffect(()=>{
        if(Object.keys(newImage).length===0){
            return;
        }else{
            // AddData in image 
            image.push(newImage);
            setImage(image);

            async function addImage(){
                await setDoc(doc(db, "album", props.albumId), {
                    images:image,
                    albumName:props.albumName,
                    updatedOn: new Date()
                });
            }

            addImage();
            setNewImage({});
        }
        
    },[newImage,image,props.albumId,props.albumName]);

    return (<>
        <section className={styled.imageListContainer}>
            {/* Form will be display if showForm is True*/}
                {showForm &&
                <Form formType={"Image"}
                refEle={imageUrlRef}
                refName={imageNameRef}
                handleOnSubmit={handleAddImage}
                />}
            {/* Add Image Form Button And Heading */}
            <div className={styled.addImageBtnAndHeading}>
                <p className={styled.ImageHeading}>Your Images:</p>
                {(showForm)?
                    <button className={styled.addImageBtn} onClick={handleShowForm}  style={{background:"red",color:"white",border:'0px'}}>Cancel</button>
                    :
                    <button className={styled.addImageBtn} onClick={handleShowForm}>Add Image</button>
                }
            </div>

            {/* Display all Images */}
            <div className={styled.displayImage}>
                {(image.length===0)
                ?
                    <h1>No Image Found</h1>
                :
                    image.map((ele,index)=>{
                        return <ShowImage
                        key={index}
                        imageUrl={ele.imageUrl}
                        imageName={ele.imageName}
                        />
                    })
                }
            </div>
        </section>
    </>)
}

export default ImageListContainer;