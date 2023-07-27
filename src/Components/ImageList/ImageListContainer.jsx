import { useEffect, useRef, useState } from "react";
import { Form } from "../ReuseComponents/Form/Form";
import { ShowImage } from "./showImages/ShowImageComponent";
import styled from './imageList.module.css'
import DisplayFullImage from "./DisplayImage/DisplayFullImage";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebaseInIt';

function ImageListContainer(props){
    const [showForm,setShowForm] = useState(false);
    const [newImage,setNewImage] = useState({});
    const [image,setImage] = useState(props.albumImages);
    const [currentIndex,setCurrentIndex] = useState(null);
    const [displayImage,setDisplayImage] = useState(false);
    const [popUpMessage,setPopUpMessage] = useState('');
    const [showPopUp,setShowPopUp] = useState(false);
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

    // onclick on button Show the full length of image
    function handleShowFullImage(index){
        setCurrentIndex(index);
        setDisplayImage(true)
    }

    // Close the Displayed image
    function handleCloseImage(){
        setCurrentIndex(null);
        setDisplayImage(false);
    }

    // when mouse is Entering showing a pop up to notify user
    function handleOnMouseEnter(message){
        setPopUpMessage(message);
    }

    // when mouse leave
    function handleOnMouseLeave(){
        setPopUpMessage("");
        setShowPopUp(false);
    }
    useEffect(()=>{
        let timeOutId;
        if(popUpMessage){
           timeOutId = setTimeout(() => {
                setShowPopUp(true);
            }, 1000);
        }
        // The cleanup function for this effect.
        return () => {
            clearTimeout(timeOutId)
        };
    },[popUpMessage])

    return (<>
        <section className={styled.imageListContainer}>
            {(showPopUp)?<p className={styled.popUpMessageContainer}>{popUpMessage}</p>:false}
            {/* If Current image is empty only then show the backward button else show the image close button */}
           
           {(!displayImage)?
            // Go Back
           <p className={styled.goBackBtn}
            onClick={props.handleGoBack}
            onMouseLeave={handleOnMouseLeave}
            onMouseEnter={()=>handleOnMouseEnter('Go Back')}
            >
                <img src="https://cdn.icon-icons.com/icons2/362/PNG/512/Go-back_36760.png"
                alt="goBack" 
                style={{width:'100%',height:'100%'}} />
            </p>:
            // Close Image
            <p className={styled.closeImageButton}>
                <img src="https://th.bing.com/th/id/OIP.SYxXDzJyaNRAghpGXJzOUwHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                style={{width:'100%',height:'100%'}}
                onClick={handleCloseImage}
                onMouseLeave={handleOnMouseLeave}
                onMouseEnter={()=>handleOnMouseEnter('Close')}
                alt="closeImage" />
            </p>
            } 


            {/* Form will be display if showForm is True*/}
                {showForm && !displayImage &&
                <Form formType={"Image"}
                refEle={imageUrlRef}
                refName={imageNameRef}
                handleOnSubmit={handleAddImage}
                />}
            {/* Add Image Form Button And Heading */}
            <div className={styled.addImageBtnAndHeading}
            style={(!displayImage)?
            {display:'flex'}:
            {display:'none'}
            }>
                <p className={styled.ImageHeading}>Your Images:</p>
                {(showForm)?
                    <button className={styled.addImageBtn} onClick={handleShowForm}  style={{background:"red",color:"white",border:'0px'}}>Cancel</button>
                    :
                    <button className={styled.addImageBtn} onClick={handleShowForm}>Add Image</button>
                }
            </div>


            {(displayImage &&
            <DisplayFullImage 
            imageIndex={currentIndex}
            images={image}
            />)
            ||
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
                        index={index}
                        handleShowFullImage={handleShowFullImage}
                        />
                    })
                }
            </div>
            } 
        </section>
    </>)
}

export default ImageListContainer;
