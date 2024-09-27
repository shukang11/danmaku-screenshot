export class ImageProcessor {
    private originalImage: HTMLImageElement | null = null;
    private topImage: HTMLImageElement | null = null;
    private bottomImage: HTMLImageElement | null = null;

    constructor(originalImage: HTMLImageElement) {
        this.originalImage = originalImage;
    }

    updateOriginalImage(image: HTMLImageElement, lineHeight: number) {
        this.originalImage = image;
        this.splitImage(lineHeight); // Default split at the middle
    }

    splitImage(bottomCutDistance: number) {
        if (!this.originalImage) return;

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        // Create top image
        tempCanvas.width = this.originalImage.width;
        tempCanvas.height = bottomCutDistance;
        tempCtx.drawImage(this.originalImage, 0, 0, this.originalImage.width, bottomCutDistance, 0, 0, this.originalImage.width, bottomCutDistance);
        this.topImage = new Image();
        this.topImage.src = tempCanvas.toDataURL();

        // Create bottom image
        tempCanvas.height = this.originalImage.height - bottomCutDistance;
        tempCtx.drawImage(this.originalImage, 0, bottomCutDistance, this.originalImage.width, this.originalImage.height - bottomCutDistance, 0, 0, this.originalImage.width, this.originalImage.height - bottomCutDistance);
        this.bottomImage = new Image();
        this.bottomImage.src = tempCanvas.toDataURL();
    }

    getOriginalImage() {
        return this.originalImage;
    }

    getTopImage() {
        return this.topImage;
    }

    getBottomImage() {
        return this.bottomImage;
    }

    generateSubtitledImage(config: {
        subtitles: string;
        fontSize: number;
        lineHeight: number;
        fontFamily: string;
        fontColor: string;
    }) {
        if (!this.originalImage) return null;
        if (!this.topImage) return null;
        if (!this.bottomImage) return null;

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return null;

        const { subtitles, fontSize, lineHeight: lineSpacing, fontFamily, fontColor } = config;
        const lines = subtitles.split("\n");
        const lineHeight = fontSize + lineSpacing;
        const fullHeight = this.originalImage.height + lines.length * lineHeight; // 计算最终输出的图片尺寸

        tempCanvas.width = this.originalImage.width;
        tempCanvas.height = fullHeight;

        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        // 绘制上部分图片
        tempCtx.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);

        tempCtx.font = `${fontSize}px ${fontFamily}`;
        tempCtx.textAlign = "center";

        // 遍历字幕行，追加下半部分图片，渲染字幕
        let y = this.originalImage.height;
        lines.forEach((line, index) => {
            if (this.bottomImage && tempCtx) {
                tempCtx.drawImage(this.bottomImage, 0, y, this.bottomImage.width, lineHeight);
                tempCtx.fillStyle = fontColor; // 设置字幕颜色
                tempCtx.fillText(line, this.bottomImage.width / 2, y + lineHeight - fontSize / 2); // 渲染字幕
            }
            y += lineHeight;
        });

        const subtitledImage = new Image();
        subtitledImage.src = tempCanvas.toDataURL();
        return subtitledImage;
    }
}
