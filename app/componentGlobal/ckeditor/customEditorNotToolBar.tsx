'use client'
import React, { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface CustomJoditEditorProps {
    name: string;
    value: string;
    onChange: (field: string, value: string) => void;
}

// Import Jodit Editor bằng dynamic để tránh lỗi SSR
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const CustomJoditEditorNotToolBar: React.FC<CustomJoditEditorProps> = ({ name, value, onChange }) => {
    const editor = useRef(null);
    const config = useMemo(() => ({
        toolbar: false,
        readonly: false,
        toolbarSticky: true,
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
        },
        eventsTimeout: 10,
    }), []);

    return (
        <div style={{ width: '100%', height: 'auto', }}>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onChange={(content: string) => onChange(name, content)}
                onBlur={(newContent: string) => onChange(name, newContent)}
                className="w-full mt-10 bg-white h-[70%]"
            />
        </div>
    );
};

export default CustomJoditEditorNotToolBar;