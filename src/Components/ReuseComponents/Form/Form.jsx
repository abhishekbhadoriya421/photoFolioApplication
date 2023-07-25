import styled from './Form.module.css'

// Add Form Component
function Form(props){
    const {formType, refEle,refName, handleOnSubmit} = props;

    return(
        <div className={styled.addAlbumFormContainer}>
            <p className={styled.AlbumHeading}>Create An {formType}</p>
            <form className={styled.addAlbumForm} onSubmit={handleOnSubmit}>
                {(formType==="Image")?
                <input type="text"
                style={{
                    marginRight:'5px',
                    textAlign:'center'
                }}
                placeholder='Enter Image Name'
                ref={refName}
                required
                />
                : false}
                

                <input type="text"
                ref={refEle}
                className={styled.addAlbumInput}
                style={{marginRight:'5px'}}
                placeholder={(formType==='Image')?
                "Enter Image URL":
                "Enter Album Name"
                } required />
                <div className={styled.buttons}>
                    <button className={styled.btn}
                    style={{color:"white",background:"green",marginRight:'5px'}}
                    type='submit'
                    >{(formType==="Image")? <>Add</>: <>Create</>}</button>
                    <button className={styled.btn} style={{color:"white",background:"red"}} type='reset'>Clear</button>
                </div>
            </form>
        </div>
    )
}

export {Form}