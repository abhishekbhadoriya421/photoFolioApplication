import { useEffect, useRef, useState } from "react";
import { Form } from "../ReuseComponents/Form/Form";
import { ShowImage } from "./showImage/ShowImageComponent";
import styled from './imageList.module.css'

import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebaseInIt';

function DisplayFullImage(props){
    return(<>
        <p className={styled.leftShift} onClick={()=>props.handleShift('left')}>
            <img src="https://th.bing.com/th/id/R.dd5dd98799cefacf522ada47c585fc12?rik=VbzDIo5bso5HFw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-DK5LlM1p_CY%2fUasBzdai-UI%2fAAAAAAAAAI0%2f__ZGi_uc62o%2fs1600%2fleft-dlx.png&ehk=%2bV8wvXKQo%2bjmNo%2f4bpZ7GXkUAsYFbyDcQu%2bNHDKrnNo%3d&risl=&pid=ImgRaw&r=0"
            style={{width:'100%',height:'100%'}}
            alt="" />
        </p>
        <div className={styled.Image}>
            <img src={props.url} alt="" style={{width:'100%',height:"100%"}}/>
        </div>
        <p className={styled.rightShift} onClick={()=>props.handleShift('right')}>
            <img src="https://th.bing.com/th/id/OIP.2eZDNaO2dCt5KYEhSS_LjAAAAA?pid=ImgDet&w=199&h=153&c=7&dpr=1.3"
            style={{width:'100%',height:'100%'}}
            alt="" />
        </p>
    </>)
}

function ImageListContainer(props){
    const [showForm,setShowForm] = useState(false);
    const [newImage,setNewImage] = useState({});
    const [image,setImage] = useState(props.albumImages);
    const [currentImage,setCurrentImage] = useState('');
    const [currentIndex,setCurrentIndex] = useState(0);
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

    function shiftImage(type){
        
        if(type==='left'){
            if(currentIndex===0){
                setCurrentImage(image[image.length-1].imageUrl);
                setCurrentIndex(image.length-1);
            }else{
                setCurrentImage(image[currentIndex-1].imageUrl);
                setCurrentIndex(currentIndex-1);
            }
        }else if(type==='right'){
            if(currentIndex===image.length-1){
                setCurrentImage(image[0].imageUrl);
                setCurrentIndex(0);
            }else{
                setCurrentImage(image[currentIndex+1].imageUrl);
                setCurrentIndex(currentIndex+1);
            }
        }
    }

    // onclick on button Show the full length of image
    function handleShowFullImage(index){
        let imageUrl = image[index].imageUrl;
        setCurrentImage(imageUrl);
        setCurrentIndex(index);
    }

    // Close the Displayed image
    function handleCloseImage(){
        setCurrentImage("");
        setCurrentIndex(0);
    }

    // when mouse is Entering showing a pop up to notify user
    function handleOnMouseEnter(message){
        setPopUpMessage(message);
    }

    // when mouse leave
    function handleOnMouseLeave(){
        console.log('leave');
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
            console.log('Component will unmount');
            clearTimeout(timeOutId)
        };
    },[popUpMessage])

    return (<>
        <section className={styled.imageListContainer}>
            {(showPopUp)?<p className={styled.popUpMessageContainer}>{popUpMessage}</p>:false}
            {/* If Current image is empty only then show the backward button else show the image close button */}
           {(!currentImage)?
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
                {showForm && !currentImage &&
                <Form formType={"Image"}
                refEle={imageUrlRef}
                refName={imageNameRef}
                handleOnSubmit={handleAddImage}
                />}
            {/* Add Image Form Button And Heading */}
            <div className={styled.addImageBtnAndHeading}
            style={(!currentImage)?
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


            {(currentImage &&
            <DisplayFullImage 
            url={currentImage}
            handleShift={shiftImage}
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