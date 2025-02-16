"use client"

import React, {useState} from 'react';

interface CopyableTextProps {
    description: string;
    textToCopy: string;
    timeToResetTooltip: number
}

export default function CopyableText({description, textToCopy, timeToResetTooltip}: CopyableTextProps) {
    const [tooltipText, setTooltipText] = useState<'Скопировать' | 'Скопировано'>('Скопировать');
    const [isHovered, setIsHovered] = useState(false);

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setTooltipText('Скопировано');
                setTimeout(() => {
                    setTooltipText('Скопировать');
                }, timeToResetTooltip);
            })
            .catch((err) => {
                console.error('Ошибка при копировании:', err);
            });
    };

    return (
        <div>
            {description}
            <span
                className="text-logo-color cursor-pointer hover:underline relative"
                onClick={() => handleCopyText(textToCopy)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {textToCopy}
                {isHovered && (
                    <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2"
                    >
                        {tooltipText}
                    </div>
                )}
            </span>
        </div>
    );
}