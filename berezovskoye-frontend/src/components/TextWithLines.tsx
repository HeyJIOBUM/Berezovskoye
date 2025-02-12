import React from 'react';

interface TextWithLinesProps {
    text: string;
}

export default function TextWithLines({ text }: TextWithLinesProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="h-[4px] flex-1 bg-lines"/>
            <span className={"mx-4 text-lg font-light"}>
                {text}
            </span>
            <div className="h-[4px] flex-1 bg-lines"/>
        </div>
    );
}