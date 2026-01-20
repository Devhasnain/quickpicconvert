import UploadImageBtn from "@/components/tool/UploadImageBtn";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import content from "@/data/content.json";
import { Tool, tools } from "@/data/tool";
import { Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";


const ImageConverter = ({ pageData }: { pageData: string }) => {
  const pageContent = JSON.parse(pageData);
  const inputRef = useRef<HTMLInputElement>(null)
  const [file,setFile] = useState<File|null>(null)
  
  const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if(files && files[0]) setFile(files[0]);

    if(inputRef.current) inputRef.current.value = ""
  }

  if (!pageContent?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link href="/tools">Back to Tools</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <PageSEO
        title={content.imageConverter.seo.title}
        description={content.imageConverter.seo.description}
        keywords={content.imageConverter.seo.keywords}
        canonical={content.imageConverter.seo.canonical}
      />
      <ToolPageLayout
        containerClassName="max-w-full"
        mainContainerClassName="max-w-full lg:px-0 sm:px-0 px-0"
        pageHero="custom"
      >
        <input
        ref={inputRef}
        type="file"
        multiple={false}
        onChange={handleOnChange}
        
        />
        <div className={"relative overflow-hidden min-h-screen gradient-bg pb-4 sm:pb-0"}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          {/* <div className="absolute -top-48 -left-28 md:-top-44 md:-left-24 xl:-top-44 xl:-left-16"> */}
          <Image
            alt=""
            src={"/images/shape-light.png"}
            width={400}
            height={400}
            className="absolute -top-48 -left-28 md:-top-44 md:-left-24 xl:-top-44 xl:-left-16"
          />
          <Logo
          className="absolute  xl:top-2 xl:left-10 md:top-3 md:left-5 z-9999"
          />
          {/* </div> */}


          {file &&<div className="flex flex-row items-center justify-end gap-8 h-screen">
            <div className="border w-6/12 flex flex-col items-center justify-center h-[70%] overflow-hidden">
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>
            <span>asdfadf</span>


            </div>
          <div className="w-3/12 h-full rounded-tl-3xl rounded-bl-3xl bg-primary z-10">

          </div>
          </div>}

          
          
          {!file && <div className="relative z-10 text-center max-w-7xl mx-auto pt-16 sm:pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                100% Free, No Sign-up Required
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 px-4 sm:px-0 ">
              {pageContent?.title}
            </h1>

            <p className="text-lg text-primary-foreground/80 mb-6 max-w-3xl mx-auto px-4 sm:px-0">
              {pageContent?.description}
            </p>

            <UploadImageBtn onClick={() => {}} />
          </div>}
        </div>
      </ToolPageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageData: JSON.stringify(
        tools.find((item) => item.id === "image-converter") || ""
      ),
    },
  };
};

export default ImageConverter;
