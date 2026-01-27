import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import NotFound from "@/components/NotFound";
import { useEffect, useState } from "react";
import { Tool, tools } from "@/data/tool";
import { toast } from "sonner";


type Props = {
  content: string;
};

const RandomPasswordGenerator = ({ content }: Props) => {
  if (!content) return <NotFound />;
  const pageData: Tool = JSON.parse(content);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      toast.error("Please select at least one option");
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(()=>{
    if(length){
      generatePassword()
    }
  },[length,options])
  return (
    <>
      <PageSEO
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords?.join(", ")}
        canonical={pageData.canonical}
      />
      <ToolPageLayout>
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <div className="bg-muted rounded-xl p-4 font-mono text-lg break-all min-h-[60px] flex items-center justify-center">
            {password || (
              <span className="text-muted-foreground">Click generate</span>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={generatePassword} className="flex-1 btn-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              disabled={!password}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">
              Length: {length[0]}
            </label>
            <Slider
              value={length}
              onValueChange={setLength}
              min={8}
              max={64}
              step={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={value}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, [key]: !!checked })
                  }
                />
                <span className="text-sm capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>
      </ToolPageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const pageData =
    tools.find((item) => item.id === "random-password-generator") || null;
  return {
    props: {
      content: pageData ? JSON.stringify(pageData) : null,
    },
  };
};

export default RandomPasswordGenerator;
