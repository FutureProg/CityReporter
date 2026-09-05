import { ImageFeed } from "@/islands/ImageFeed.tsx";
import Camera from "@/islands/Camera.tsx";
import { ImagesSignal, createImagesSignal } from "@/signals.ts";

export const App = () => {
  const capturedImages: ImagesSignal = createImagesSignal();
  return (
    <>
      <div className="camera-roll">
        <Camera imagesSignal={capturedImages} />
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
