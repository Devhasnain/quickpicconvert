// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import ToolPageLayout from "@/components/tool/ToolPageLayout";
// import { Button } from "@/components/ui/button";
// import { PageSEO } from "@/components/PageSEO";
// import { icons } from "lucide-react";
// import Image from "next/image";
// import EXIF from "exif-js";


// const ImageMetadataReader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [metadata, setMetadata] = useState(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const openExplorer = () => {
//     inputRef.current?.click();
//   };

//   const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setFile(e.target.files[0]);
//     }

//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   const handleFileReadMeta=async()=>{
//     if(!file){
//         console.log('returned')
//         return
//     }
//     try {
//     await EXIF.getData(URL.createObjectURL(file), function (this: any) {
//         console.log(file)
//       const allMeta = EXIF.getAllTags(this);
//       console.log(allMeta)
//       setMetadata(allMeta);
//     });
//     } catch (error) {
//     console.log(error)    
//     }
//   }

//   useEffect(()=>{
//     if(file){
//         handleFileReadMeta()
//     }
//   },[file]);

//   console.log(metadata)

//   return (
//     <>
//       <input
//         ref={inputRef}
//         type="file"
//         multiple
//         accept="image/png,image/jpeg"
//         onChange={handleFilesOnChange}
//         className="hidden"
//       />
//       <PageSEO
//         title="Image Metadata Reader Online - View EXIF Data & Image Info"
//         description="View and analyze image metadata online, including EXIF data, camera details, resolution, and file information. Fast, secure, and browser-based image metadata viewer."
//         keywords="image metadata reader, exif viewer, photo metadata online, image info viewer, online exif reader, check image details, analyze image metadata"
//         canonical="https://quickpicconvert.com/image-metadata-reader"
//       />

//       <ToolPageLayout>
//         <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
//           {file && (
//             <div className="w-full border rounded-md h-[40vh] flex flex-col items-center justify-center">
//               <Image
//                 height={0}
//                 width={0}
//                 alt="image-preview"
//                 src={URL.createObjectURL(file)}
//                 className="object-contain w-full h-full"
//               />
//             </div>
//           )}
//           {!file && (
//             <div
//               onClick={openExplorer}
//               className="w-full h-[35vh] flex border border-primary/80 border-dashed mb-5 flex-col items-center justify-center rounded-md gap-2"
//             >
//               <icons.Image className="w-12 h-12 text-primary/80" />
//               <Button size="lg">Choose image</Button>
//               <span className="text-primary/80">Click to upload image</span>
//             </div>
//           )}
//           {metadata && (
//             <div className="mt-4">
//               <h2 className="font-semibold text-lg">Metadata / EXIF Data:</h2>
//               <ul className="list-disc pl-5 space-y-1 max-h-64 overflow-auto">
//                 {Object.entries(metadata).map(([key, value]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {value?.toString()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </ToolPageLayout>
//     </>
//   );
// };

// export default ImageMetadataReader;
