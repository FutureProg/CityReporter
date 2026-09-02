import { Signal } from "@preact/signals";
import styles from '@/islands/ImageFeed.module.css';

export type ImageFeedProps = {
    images: Signal<ImageBitmap[]>;
}

export const ImageFeed = ({images}: ImageFeedProps) => {
    const imagePreview = images.value.map((img, idx) => {      
        return <img src="" key={idx} />
    });
    return (
        <div className={styles.view}>
            {imagePreview}
        </div>
    )
}