import styles from '@/islands/ImageFeed.module.css';
import { ImagesSignal } from "@/signals.ts";
import { useRef } from "preact/hooks";
import { effect } from "@preact/signals";

export type ImageFeedProps = {
    imagesSignal: ImagesSignal;
}

export const ImageFeed = ({imagesSignal: images}: ImageFeedProps) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const prevImageCount = useRef<number>(images.peek().length);
    const imageBlobUrls = useRef(new WeakMap<Blob, string>());
    effect(() => {
        if (prevImageCount.current < images.value.length && viewRef.current) {
            viewRef.current.scrollLeft = viewRef.current.scrollWidth + 40;
        }
        prevImageCount.current = images.value.length;
    });
    const imagePreview = images.value.map((imgBlob) => {
        let imageUrl = imageBlobUrls.current.get(imgBlob);
        if (!imageUrl) {
            imageUrl = URL.createObjectURL(imgBlob);
            imageBlobUrls.current.set(imgBlob, imageUrl);
        }
        return <img src={imageUrl} key={imageUrl} />
    });
    
    return (
        <div className={styles.view} ref={viewRef}>
            <button className={styles.buttonItem} type="button" role="button" aria-label="Open the camera">
                <span className={styles.icon} aria-hidden="true" />
            </button>
            {imagePreview}
        </div>
    )
}