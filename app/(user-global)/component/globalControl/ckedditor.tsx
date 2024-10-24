import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Button from "../globalControl/btnComponent";
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Essentials,
    FindAndReplace,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/vi.js';
import 'ckeditor5/ckeditor5.css';
import styles from '@public/styles/globalControl/Cked.module.css';

interface FaqProps {
    courseId: number;
    onClose: () => void;
    onSubmit: (data: string) => void; // Callback để gửi dữ liệu ra ngoài
}

const CKEditorComponent: React.FC<FaqProps> = ({ courseId, onClose, onSubmit }) => {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const handleSubmit = () => {
        onSubmit(editorData);
        onClose();
    };

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'findAndReplace',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertTable',
                'blockQuote',
                '|',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            BlockToolbar,
            Bold,
            Essentials,
            FindAndReplace,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            Underline,
            Undo
        ],
        initialData: 'Mời bạn nhập câu hỏi',
        language: 'vi',
        translations: [translations]
    };

    return (
        <div className={styles.mainContainer}>
            <div
                className={`${styles.editorContainer} ${styles.editorContainerClassicEditor} ${styles.editorContainerIncludeBlockToolbar}`}
                ref={editorContainerRef}
            >
                <div className={styles.editor}>
                    {isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} onChange={handleEditorChange} />}
                </div>
            </div>
        </div>
    );
};

export default CKEditorComponent;
