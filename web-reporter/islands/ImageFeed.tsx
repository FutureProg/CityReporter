import styles from '@/islands/ImageFeed.module.css';
import { ImagesSignal } from "@/signals.ts";

export type ImageFeedProps = {
    imagesSignal: ImagesSignal;
}

export const ImageFeed = ({imagesSignal: images}: ImageFeedProps) => {
    const imagePreview = images.value.map((imgBlob, idx) => {     
        const imageUrl = URL.createObjectURL(imgBlob) 
        return <img src={imageUrl} key={idx} />
    });
    return (
        <div className={styles.view}>
            {imagePreview}
        </div>
    )
}