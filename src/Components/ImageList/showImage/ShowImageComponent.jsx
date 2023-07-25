import styled from './showImage.module.css'

function ShowImage(props){
    const {imageUrl, imageName} = props;
    return(<>
        <div className={styled.imageContent}>
            <div className={styled.image}>
                <img src={imageUrl}
                style={{width:'100%',height:'100%'}} 
                alt={imageName} />
            </div>
            <div className={styled.content}>
                <p className="para">{imageName}</p>
            </div>
        </div>
    </>)
}

export {ShowImage};