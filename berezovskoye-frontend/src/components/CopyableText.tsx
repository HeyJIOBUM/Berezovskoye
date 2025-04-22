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
                setIsHovered(true);
                setTimeout(() => {
                    setTooltipText('Скопировать');
                    setIsHovered(false);
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
                className="relative cursor-pointer text-logo-color hover:underline"
                onClick={() => handleCopyText(textToCopy)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {textToCopy}
                {isHovered && (
                    <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black p-2 text-xs text-white"
                    >
                        {tooltipText}
                    </div>
                )}
            </span>
        </div>
    );
}