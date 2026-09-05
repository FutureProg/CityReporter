import { ImageFeed } from "@/islands/ImageFeed.tsx";
import { Carousel } from "@/islands/Carousel.tsx";
import { ImagesSignal, createImagesSignal } from "@/signals.ts";

export const App = () => {
  const capturedImages: ImagesSignal = createImagesSignal();
  return (
    <>
      <div className="camera-roll">
        <Carousel imagesSignal={capturedImages} />
      </div>
      <div class="image-row">
        <ImageFeed imagesSignal={capturedImages} />
      </div>
      <div class="message-row">
        <textarea class="message-text">
        </textarea>
        <input type="submit" />
      </div>
    </>
  );
};
