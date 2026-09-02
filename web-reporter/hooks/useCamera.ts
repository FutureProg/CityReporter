import { useSignalRef } from "@preact/signals/utils";
import { useEffect } from "preact/hooks";

export const useCamera = () => {
    const previewRef = useSignalRef<HTMLVideoElement | null>(null);  
    const isCameraSupported = 'mediaDevices' in navigator;

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
                previewRef.current.srcObject = null;
            }            
        }

        function startCamera() {
            const stream = previewRef.current?.srcObject as MediaStream | null;
            if (stream?.getTracks().some(track => track.readyState === 'live')) return;

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                if (previewRef.current) previewRef.current.srcObject = stream;
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
        videoElementRef: previewRef
    }
}