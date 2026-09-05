import styles from "./Carousel.module.css";
import Camera from "@/islands/Camera.tsx";
import { ImagesSignal } from "@/signals.ts";
import { useRef } from "preact/hooks";

export type CarouselProps = {
    imagesSignal: ImagesSignal;
}

/**
 * The carousel contains the camera and photos that were taken
 */
export const Carousel = ({ imagesSignal: images }: CarouselProps) => {
    const imageBlobUrls = useRef(new WeakMap<Blob, string>());

    const slides = images.value.map((imgBlob) => {
        let imageUrl = imageBlobUrls.current.get(imgBlob);
        if (!imageUrl) {
            imageUrl = URL.createObjectURL(imgBlob);
            imageBlobUrls.current.set(imgBlob, imageUrl);
        }
        return (
            <div className={`${styles.slide} ${styles.photoSlide}`} key={imageUrl}>
                <img src={imageUrl} />
            </div>
        );
    });

    return (
        <div className={styles.view}>
            <div className={styles.slide}>
                <Camera imagesSignal={images} />
            </div>
            {slides}
        </div>
    );
}
