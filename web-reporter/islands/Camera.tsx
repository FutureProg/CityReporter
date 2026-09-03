import styles from "./Camera.module.css";
import { useCamera } from "@/hooks/useCamera.ts";
import { ImagesSignal } from "@/signals.ts";
import LoadingSVG from '@/assets/loading-blocks-wave.svg';
import CameraIcon from '@/assets/camera-icon.svg';
import { pickClassNames } from "@/utils.ts";
import { useSignal } from "@preact/signals";

export type CameraProps = {
  imagesSignal: ImagesSignal;
}

export default function Camera({imagesSignal} : CameraProps) {
  const { videoElementRef, capturePhoto } = useCamera();  
  const isCapturingPhoto = useSignal(false);

  const onCapture = async () => {
    isCapturingPhoto.value = true;    
    await capturePhoto().then((blob) => {
      if (blob) {
        imagesSignal.value = [...imagesSignal.value, blob]        
      }
    })
    .finally(() => {
      isCapturingPhoto.value = false;
    });
  };

  return (
    <div className={styles.view} aria-busy={isCapturingPhoto.value}>
      <video
        ref={videoElementRef}
        className={pickClassNames(styles.preview,{
          [styles.dim]: isCapturingPhoto.value
        })}
        controls={false}
        playsInline
        autoPlay
      >
      </video>
      <img 
        aria-hidden
        className={pickClassNames(
        styles.loadingIcon, {[styles.visible]: isCapturingPhoto.value})} 
        src={LoadingSVG} />
      <button 
        disabled={isCapturingPhoto.value} 
        
        aria-disabled={isCapturingPhoto.value}
        type="button" onClick={onCapture} className={styles.captureButton}>
          <img src={CameraIcon} alt="image capture button"/>
      </button> 
      <span className='visually-hidden' role="status">
        {isCapturingPhoto.value ? "Capturing photo...": ""}
      </span>
    </div>
  );
}
