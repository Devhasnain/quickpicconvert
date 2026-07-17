import ConverterToolBar from "@/components/tool/ConverterToolBar";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { withToolProps } from "@/lib/withToolProps";


type Props = {
  tool:string
}

const JpgToPng = ({tool}:Props) => {
  return (
    <ToolPageLayout
    tool={JSON.parse(tool)}
    hideTextContent={true}
    toolBar={
      <ConverterToolBar/>
    }
    >
      s
      {/* <ImageConverter accept="image/jpeg" output="png" title="Jpg to png" /> */}
    </ToolPageLayout>
  );
};

export const getStaticProps = async () => {
  return withToolProps('jpg-to-png');
};

export default JpgToPng;
