import React, { useState } from 'react';
import { Upload, Image as ImageIcon, RefreshCw } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setColorizedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleColorize = () => {
    if (!originalImage) return;
    setIsProcessing(true);
    // Simulating colorization process
    setTimeout(() => {
      setColorizedImage(originalImage); // In a real app, this would be the colorized image URL
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Automated Image Colorization
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ImageUpload onImageUpload={handleImageUpload} />
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleColorize}
              disabled={!originalImage || isProcessing}
              className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                (!originalImage || isProcessing) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <ImageIcon className="-ml-1 mr-2 h-5 w-5" />
                  Colorize Image
                </>
              )}
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImageDisplay title="Original Image" imageUrl={originalImage} />
            <ImageDisplay title="Colorized Image" imageUrl={colorizedImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;