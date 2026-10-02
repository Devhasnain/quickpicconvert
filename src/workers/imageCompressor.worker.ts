import { compressImages, downloadUrlsAsZip } from "@/lib/utils";


self.onmessage = async (e) => {
    if(e.data.type === "COMPRESS"){
        const results = await compressImages(e.data.payload)
        self.postMessage(results)
    }

    if(e.data.type === "DOWNLOAD"){
        const result = await downloadUrlsAsZip(e.data.payload)
        self.postMessage(result)
    }
}