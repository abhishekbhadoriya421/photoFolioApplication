import styled from './NavbarStyle.module.css';
export default function Navbar(){
    return(<>
        <nav className={styled.navContainer}>
            <div className={styled.navDetail}>
                <div className={styled.logo}>
                    <img className={styled.image} src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png" alt="Loading" />
                </div>
                <p className={styled.name}>Photo Folio</p>
            </div> 
        </nav>  
    </>)
}
