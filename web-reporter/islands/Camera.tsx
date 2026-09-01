import styles from './Camera.module.css';
import { useCamera } from "@/hooks/useCamera.ts";

export default function Camera() {       
    const {videoElementRef} = useCamera();

    return (
        <div className={styles.view}>
            <video ref={videoElementRef} className={styles.preview} controls playsInline autoPlay></video>
        </div>
    )
}