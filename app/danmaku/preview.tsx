'use client';

import React from "react";

interface PreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    handleDownload: () => void;
}

const Preview: React.FC<PreviewProps> = ({ canvasRef, handleDownload }) => {
    return (
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            <div className="flex flex-col items-center">
                <canvas ref={canvasRef} className="border border-gray-300 rounded" />
                <button onClick={handleDownload} className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
                    Download Image
                </button>
            </div>
        </div>
    );
};

export default Preview;