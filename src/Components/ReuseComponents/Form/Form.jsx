import styled from './Form.module.css'

// Add Form Component
function Form(props){
    const {formType, refEle, handleOnSubmit} = props;

    return(
        <div className={styled.addAlbumFormContainer}>
            <p className={styled.AlbumHeading}>Create An {formType}</p>
            <form className={styled.addAlbumForm} onSubmit={handleOnSubmit}>
                <input type="text" name='albumName' ref={refEle} className={styled.addAlbumInput} placeholder={`Enter ${formType} Name`} required />
                <div className={styled.buttons}>
                    <button className={styled.btn}
                    style={{color:"white",background:"green"}}
                    type='submit'
                    >{(formType==="Image")? <>Add</>: <>Create</>}</button>
                    <button className={styled.btn} style={{color:"white",background:"red"}} type='reset'>Clear</button>
                </div>
            </form>
        </div>
    )
}

export {Form}