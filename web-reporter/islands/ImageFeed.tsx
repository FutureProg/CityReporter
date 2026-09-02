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
    effect(() => {
        if (prevImageCount.current < images.value.length && viewRef.current) {
            viewRef.current.scrollLeft = viewRef.current.scrollWidth + 40;
        }
        prevImageCount.current = images.value.length;
    });
    const imagePreview = images.value.map((imgBlob, idx) => {
        const imageUrl = URL.createObjectURL(imgBlob) 
        return <img src={imageUrl} key={idx} />
    });    
    
    return (
        <div className={styles.view} ref={viewRef}>
            {imagePreview}
        </div>
    )
}