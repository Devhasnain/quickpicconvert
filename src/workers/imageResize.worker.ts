import { cropImage, downloadUrlsAsZip, resizeImages } from "@/lib/utils";


self.onmessage = async (e) => {
    if (e.data.type === "RESIZE") {
        const results = await resizeImages(e.data.payload)
        self.postMessage(results)
    }
    if (e.data.type === "CROP") {
        const results = await cropImage(e.data.payload)
        self.postMessage(results)
    }
    if (e.data.type === "DOWNLOAD") {
        const result = await downloadUrlsAsZip(e.data.payload)
        self.postMessage(result)
    }
}