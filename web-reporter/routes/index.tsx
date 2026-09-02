import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Camera from "@/islands/Camera.tsx";
import { ImageFeed } from "@/islands/ImageFeed.tsx";
import { createImagesSignal, ImagesSignal } from "@/signals.ts";

export default define.page(function Home(ctx) {  

  console.log("Shared value " + ctx.state.shared);
  const capturedImages: ImagesSignal = createImagesSignal();

  return (
    <main class="app-view">
      <Head>
        <title>City Reporter</title>
      </Head>      
        <div>
          <Camera imagesSignal={capturedImages} />
        </div>      
        <div class="image-row">
          <ImageFeed imagesSignal={capturedImages} />
        </div>  
        <div class="message-row">
          <textarea class="message-text">            
          </textarea>
          <input type="submit"/>
        </div>      
    </main>
  );
});
