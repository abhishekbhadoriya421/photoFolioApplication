import { useState } from "react";
import styled from "./displayFullImage.module.css";
function DisplayFullImage(props) {
  const { images, imageIndex } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  // Function to Shift Image Left
  function handleLeftShift() {
    if (currentImageIndex === 0) {
      console.log("cannot scroll Left");
      return false;
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }

  function handleRightShift() {
    if (currentImageIndex === images.length - 1) {
      console.log("cannot scroll Right");
      return false;
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }
  return (
    <>
      {/* show left icon only if images are exist for shifting */}
      {currentImageIndex === 0 ? (
        false
      ) : (
        <p className={styled.leftShift}>
          <img
            src="https://th.bing.com/th/id/R.dd5dd98799cefacf522ada47c585fc12?rik=VbzDIo5bso5HFw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-DK5LlM1p_CY%2fUasBzdai-UI%2fAAAAAAAAAI0%2f__ZGi_uc62o%2fs1600%2fleft-dlx.png&ehk=%2bV8wvXKQo%2bjmNo%2f4bpZ7GXkUAsYFbyDcQu%2bNHDKrnNo%3d&risl=&pid=ImgRaw&r=0"
            style={{ width: "100%", height: "100%" }}
            onClick={handleLeftShift}
            alt=""
          />
        </p>
      )}
      {/* Image To Be Displayed */}
      <div className={styled.imageContainer}>
        {images.map((ele, index) => {
          return (
            <div
              className={styled.ImageShow}
              style={
                index === currentImageIndex
                  ? styl.showImage
                  : index < currentImageIndex
                  ? styl.hideLeft
                  : styl.hideRight
              }
              key={index}
            >
              <img
                src={ele.imageUrl}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </div>

      {/* show Right icon only if images are exist for shifting */}

      {currentImageIndex === images.length - 1 ? (
        false
      ) : (
        <p className={styled.rightShift}>
          <img
            src="https://th.bing.com/th/id/OIP.2eZDNaO2dCt5KYEhSS_LjAAAAA?pid=ImgDet&w=199&h=153&c=7&dpr=1.3"
            style={{ width: "100%", height: "100%" }}
            onClick={handleRightShift}
            alt=""
          />
        </p>
      )}
    </>
  );
}

export default DisplayFullImage;

// Carousel Style

const styl = {
  showImage: {
    left: "2.5%",
  },
  hideLeft: {
    left: "-100%",
  },
  hideRight: {
    left: "100%",
  },
};
