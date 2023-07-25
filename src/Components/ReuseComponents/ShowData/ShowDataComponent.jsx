import styled from './showData.module.css';
export default function ShowData(props){
    const {image,content,handleShowUserImage,id} = props; 
    return(<>
        <div className={styled.dataContainer} onClick={()=>handleShowUserImage(id)}>
            <div className={styled.dataImage}>
                <img src={image}className={styled.image} alt="Loading" />
            </div>
            <div className={styled.content}>
                <p className={styled.para}>
                    {content}
                </p>
            </div>
        </div>
    </>)
}