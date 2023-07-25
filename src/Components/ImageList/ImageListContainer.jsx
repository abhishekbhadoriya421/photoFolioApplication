import { useState } from "react";
import { Form } from "../ReuseComponents/Form/Form";
import styled from './imageList.module.css'

function ImageListContainer(props){
    const [showForm,setShowForm] = useState(false);
    function handleShowForm(){
        setShowForm(!showForm);
    }
    return (<>
    <section className={styled.imageListContainer}>
          {/* Form will be display if showForm is True*/}
             {showForm && <Form formType={"Image"}/>}
        {/* Add Image Form Button And Heading */}
        <div className={styled.addImageBtnAndHeading}>
            <p className={styled.ImageHeading}>Your Images:</p>
            {(showForm)?
                <button className={styled.addImageBtn} onClick={handleShowForm}  style={{background:"red",color:"white",border:'0px'}}>Cancel</button>
                :
                <button className={styled.addImageBtn} onClick={handleShowForm}>Add Image</button>
            }
        </div>

        {/* Show Image */}
    </section>
    </>)
}

export default ImageListContainer;