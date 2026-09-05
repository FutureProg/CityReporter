import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Camera from "@/islands/Camera.tsx";
import { ImageFeed } from "@/islands/ImageFeed.tsx";
import { createImagesSignal, ImagesSignal } from "@/signals.ts";
import { App } from "@/islands/App.tsx";

export default define.page(function Home(ctx) {  

  console.log("Shared value " + ctx.state.shared);

  return (
    <main class="app-view">
      <Head>
        <title>City Reporter</title>
      </Head>               
      <App />        
    </main>
  );
});
