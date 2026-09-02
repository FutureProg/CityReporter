import { Signal } from "@preact/signals";
import styles from "./Camera.module.css";
import { useCamera } from "@/hooks/useCamera.ts";
import { ImagesSignal } from "@/signals.ts";

export type CameraProps = {
  imagesSignal: ImagesSignal;
}

export default function Camera({imagesSignal} : CameraProps) {
  const { videoElementRef, capturePhoto } = useCamera();

  const onCapture = async () => {
    await capturePhoto().then((blob) => {
      if (blob) {
        imagesSignal.value = [...imagesSignal.value, blob]
      }
    })
  };

  return (
    <div className={styles.view}>
      <video
        ref={videoElementRef}
        className={styles.preview}
        controls={false}
        playsInline
        autoPlay
      >
      </video>
      <button type="button" onClick={onCapture} className={styles.captureButton}>Capture</button> 
    </div>
  );
}
