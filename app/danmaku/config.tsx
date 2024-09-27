'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ConfigProps {
    config: {
        subtitles: string;
        fontSize: number;
        lineSpacing: number;
        fontFamily: string;
        fontColor: string;
    };
    setConfig: (config: Partial<ConfigProps['config']>) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGenerate: () => void; // 添加生成按钮的处理函数
}

const Config: React.FC<ConfigProps> = ({
    config,
    setConfig,
    handleImageUpload,
    handleGenerate,
}) => {
    const form = useForm();

    const handleChange = (key: keyof ConfigProps['config'], value: string | number) => {
        setConfig({ [key]: value });
    };

    return (
        <Form {...form}>
            <form className="w-full md:w-1/2 p-4 space-y-6">
                <FormField
                    control={form.control}
                    name="image-upload"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="image-upload">图片上传 (Image Upload)</FormLabel>
                            <FormControl>
                                <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full mt-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subtitles"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="subtitles">字幕 (Subtitles)</FormLabel>
                            <FormControl>
                                <Textarea
                                    id="subtitles"
                                    value={config.subtitles}
                                    onChange={(e) => handleChange('subtitles', e.target.value)}
                                    rows={5}
                                    placeholder="在此输入字幕，每行一个 (Enter subtitles here, one per line)"
                                    className="w-full mt-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="font-settings"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>字体设置 (Font Settings)</FormLabel>
                            <div className="flex flex-col space-y-4 mt-2">
                                <FormField
                                    control={form.control}
                                    name="fontSize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select
                                                    value={config.fontSize.toString()}
                                                    onValueChange={(value) => handleChange('fontSize', parseInt(value))}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="选择字体大小 (Select font size)" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="16">16px</SelectItem>
                                                        <SelectItem value="20">20px</SelectItem>
                                                        <SelectItem value="24">24px</SelectItem>
                                                        <SelectItem value="28">28px</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lineSpacing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>行间距 (Line spacing)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    value={config.lineSpacing}
                                                    onChange={(e) => handleChange('lineSpacing', parseFloat(e.target.value))}
                                                    min="1"
                                                    max="3"
                                                    step="0.1"
                                                    placeholder="行间距 (Line spacing)"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fontFamily"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>字体 (Font family)</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={config.fontFamily}
                                                    onValueChange={(value) => handleChange('fontFamily', value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="选择字体 (Select font family)" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Arial">Arial</SelectItem>
                                                        <SelectItem value="Verdana">Verdana</SelectItem>
                                                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                                        <SelectItem value="Courier">Courier</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fontColor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>颜色 (Color)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="color"
                                                    value={config.fontColor}
                                                    onChange={(e) => handleChange('fontColor', e.target.value)}
                                                    placeholder="字体颜色 (Font color)"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <button type="button" onClick={handleGenerate} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    生成 (Generate)
                </button>
            </form>
        </Form>
    );
};

export default Config;