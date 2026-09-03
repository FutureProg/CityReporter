import { useSignalRef } from "@preact/signals/utils";
import { useEffect, useRef } from "preact/hooks";

export const useCamera = () => {
    const previewRef = useSignalRef<HTMLVideoElement | null>(null);
    const imageCapture = useRef<ImageCapture | null>(null); 
    const isCameraSupported = 'mediaDevices' in navigator;

    function capturePhoto() {
        if (imageCapture.current) {
            return imageCapture.current.takePhoto();
        }
        return Promise.reject('Image Capture Failed');
    }

    useEffect(() => {
        if (!previewRef.current) return;

        const constraints = {
            video: {
                facingMode: 'environment'
            }
        } satisfies MediaStreamConstraints;

        function stopCamera() {            
            const stream = previewRef.current?.srcObject as MediaStream | null;
            stream?.getTracks().forEach(track => track.stop());            
            if (previewRef.current) {
                console.log("Stop Camera");                
                imageCapture.current = null;
                previewRef.current.srcObject = null;
            }
        }        

        function startCamera() {
            if (document.visibilityState === "hidden") return;
            const stream = previewRef.current?.srcObject as MediaStream | null;            
            if (stream?.getTracks().some(track => track.readyState === 'live')) return;

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                if (previewRef.current){
                    previewRef.current.srcObject = stream;
                    const track = stream.getVideoTracks()[0];
                    imageCapture.current = new ImageCapture(track);
                } 
            });
        }

        function handlePause() {
            if (document.hidden || !document.hasFocus()) stopCamera();
        }

        function handleResume() {
            if (!document.hidden && document.hasFocus()) startCamera();
        }

        startCamera();
        document.addEventListener('visibilitychange', handlePause);
        self.addEventListener('blur', handlePause);
        self.addEventListener('focus', handleResume);

        return () => {
            document.removeEventListener('visibilitychange', handlePause);
            self.removeEventListener('blur', handlePause);
            self.removeEventListener('focus', handleResume);
            stopCamera();
        };
    }, [previewRef.current]);

    return {
        isCameraSupported,
        videoElementRef: previewRef,
        capturePhoto
    }
}