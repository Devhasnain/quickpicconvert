import { convertImages, downloadUrlsAsZip } from "@/lib/utils";


self.onmessage = async (e) => {
    if (e.data.type === "CONVERT") {
        const results = await convertImages(e.data.payload)
        self.postMessage(results)
    }

    if (e.data.type === "DOWNLOAD") {
        const result = await downloadUrlsAsZip(e.data.payload)
        self.postMessage(result)
    }
}