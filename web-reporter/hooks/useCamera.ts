import { useSignalRef } from "@preact/signals/utils";
import { useEffect } from "preact/hooks";

export const useCamera = () => {
    const previewRef = useSignalRef<HTMLVideoElement | null>(null);  
    const isCameraSupported = 'mediaDevices' in navigator;

    useEffect(() => {
        if (!previewRef.current) return;

        const constraints = {
            video: true
        } satisfies MediaStreamConstraints;

        function stopCamera() {            
            const stream = previewRef.current?.srcObject as MediaStream | null;
            stream?.getTracks().forEach(track => track.stop());
            if (previewRef.current) {
                console.log("Stop Camera");
                previewRef.current.srcObject = null;
            }            
        }

        function startCamera() {
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                if (previewRef.current) previewRef.current.srcObject = stream;                
            });
        }

        function handleVisibilityChange() {
            if (document.hidden) {
                stopCamera();
            } else {
                startCamera();
            }
        }

        startCamera();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            stopCamera();
        };
    }, [previewRef.current]);

    return {
        isCameraSupported,
        videoElementRef: previewRef
    }
}