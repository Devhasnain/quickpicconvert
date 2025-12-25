import ToolPageLayout from '@/components/tool/ToolPageLayout';
import ImageConverter from '@/components/tool/ImageConverter';
import { Layout } from '@/components/layout/Layout';
import React from 'react';


const PngToJpg = () => {
  return (
      <ToolPageLayout>
      <ImageConverter
       accept="png"
       output="jpg"
       title="Png to Jpg"
       />
      </ToolPageLayout>
  )
}

export default PngToJpg