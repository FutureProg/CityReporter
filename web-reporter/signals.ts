import { useSignal, type Signal } from "@preact/signals";

export type ImagesSignal = Signal<Blob[]>;
export const createImagesSignal = () => useSignal<Blob[]>([]);