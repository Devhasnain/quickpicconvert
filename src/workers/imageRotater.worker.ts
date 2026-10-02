import { downloadUrlsAsZip, rotateImages } from "@/lib/utils";


self.onmessage = async (e) => {

    if (e.data.type === "ROTATE") {
        const results = await rotateImages(e.data.payload)
        self.postMessage(results)
    }
    if (e.data.type === "DOWNLOAD") {
        const results = await downloadUrlsAsZip(e.data.payload)
        self.postMessage(results)
    }
}