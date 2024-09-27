'use client';

import React, { useRef, useState, useEffect } from "react";
import Config from "./config";
import Preview from "./preview";
import test from "@/app/test.png";

export default function DanmakuScreenshot() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageSrc, setImageSrc] = useState<HTMLImageElement | null>(null);

    const [config, setConfig] = useState({
        subtitles: "阿芙  发 \n  你好",
        fontSize: 16,
        lineHeight: 20,
        fontFamily: "Arial",
        fontColor: "#ff00ff"
    });

    useEffect(() => {
        const img = new Image() as HTMLImageElement;
        img.onload = () => {
            setImageSrc(img);
            updateCanvas(img);
        };
        img.src = test.src;
    }, []);

    const handleUpdateConfig = (newConfig: Partial<typeof config>) => {
        setConfig({ ...config, ...newConfig });
        // if (!imageSrc) return;
        // const img = new Image() as HTMLImageElement;
        // img.onload = () => {
        //     setImageSrc(img);
        //     updateCanvas(img);
        // };
        // img.src = imageSrc.src;
        // updateCanvas(img);
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image() as HTMLImageElement;
                img.onload = () => {
                    setImageSrc(img);
                    updateCanvas(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const updateCanvas = (img: HTMLImageElement) => {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        const { subtitles, fontSize, lineHeight: lineSpacing, fontFamily, fontColor } = config;
        const lines = subtitles.split("\n");
        const lineHeight = fontSize + lineSpacing;
        const fullHeight = img.height + lines.length * lineHeight; // 修正 fullHeight 计算

        tempCanvas.width = img.width;
        tempCanvas.height = fullHeight;

        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Draw the image
        const originY = img.height; // 修正 originY 计算
        let y = originY;
        tempCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

        tempCtx.font = `${fontSize}px ${fontFamily}`;
        tempCtx.textAlign = "center";

        // Draw the text
        lines.forEach((line, index) => {
            tempCtx.fillRect(0, y, img.width, lineHeight);
            tempCtx.drawImage(img, 0, img.height - lineHeight, img.width, lineHeight, 0, y, img.width, lineHeight);
            tempCtx.fillStyle = fontColor; // Set the text color
            tempCtx.fillText(line, img.width / 2, y + lineHeight - fontSize / 2); // 修正 y 坐标计算
            y += lineHeight;
        });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = tempCanvas.width;
        canvas.height = tempCanvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "subtitled_image.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <div className="flex flex-col md:flex-row w-full">
                <Config
                    config={config}
                    setConfig={handleUpdateConfig}
                    handleImageUpload={handleImageUpload}
                />
                <Preview canvasRef={canvasRef} handleDownload={handleDownload} />
            </div>
        </div>
    );
}