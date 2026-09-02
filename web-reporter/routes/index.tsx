import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Camera from "@/islands/Camera.tsx";

export default define.page(function Home(ctx) {  

  console.log("Shared value " + ctx.state.shared);

  return (
    <main class="app-view">
      <Head>
        <title>City Reporter</title>
      </Head>      
        <div>
          <Camera />          
        </div>        
        <div>
          <textarea class="message-text">            
          </textarea>
          <input type="submit"/>
        </div>      
    </main>
  );
});
