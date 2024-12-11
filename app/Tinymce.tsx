// import React, { useRef, useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import type { Editor as TinyMCEEditor } from 'tinymce';

// interface CkEditorCustomProps {
//     initialData?: string;
//     onChange?: (data: string) => void;
// }

// const Tinymce: React.FC<CkEditorCustomProps> = ({ initialData, onChange }) => {
//     const editorRef = useRef<TinyMCEEditor | null>(null);
//     const [editorData, setEditorData] = useState<string>(initialData || '');

//     const log = () => {
//         if (editorRef.current) {
//             console.log(editorRef.current.getContent()); // Lấy nội dung editor
//         }
//     };

//     const handleEditorChange = (content: string) => {
//         setEditorData(content); // Cập nhật state
//         if (onChange) {
//             onChange(content); // Gọi callback nếu có
//         }
//     };

//     const token = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

//     return (
//         <>
//             <Editor
//                 apiKey={token}
//                 initialValue={editorData} // Giá trị ban đầu
//                 onInit={(_, editor) => (editorRef.current = editor)} // Lưu reference của editor
//                 onEditorChange={handleEditorChange} // Lắng nghe thay đổi
//                 init={{
//                     height: 500,
//                     menubar: false,
//                     plugins: [
//                         'advlist',
//                         'autolink',
//                         'lists',
//                         'link',
//                         'image', // Plugin hình ảnh
//                         'charmap',
//                         'preview',
//                         'anchor',
//                         'searchreplace',
//                         'visualblocks',
//                         'code',
//                         'fullscreen',
//                         'insertdatetime',
//                         'media',
//                         'table',
//                         'code',
//                         'help',
//                         'wordcount',
//                     ],
//                     toolbar:
//                         'undo redo | blocks | ' +
//                         'bold italic forecolor | alignleft aligncenter ' +
//                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                         'removeformat | help | image', // Thêm nút hình ảnh vào toolbar
//                     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//                 }}
//             />
//             <button onClick={log}>Log editor content</button>
//         </>
//     );
// };

// export default Tinymce;


import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
interface CkEditorCustomProps {
    initialData?: string;
    onChange?: (data: string) => void;
}
const Tinymce: React.FC<CkEditorCustomProps> = ({ initialData, onChange }) => {
    const [editorData, setEditorData] = useState<string>(initialData || '');
    const handleEditorChange = (content: string) => {
        setEditorData(content); // Cập nhật state
        console.log(editorData)
        if (onChange) {
            onChange(content); // Gọi callback nếu có
        }
    };
    const token = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
    return (
        <Editor

            // onInit={(_, editor) => (editorRef.current = editor)}
            onEditorChange={handleEditorChange}
            apiKey={token}
            init={{
                plugins: [
                    // Core editing features
                    // 'anchor', 
                    'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Dec 25, 2024:
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                    // Early access to document converters
                    'importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
            }}
            initialValue={initialData}
        />
    );
}

export default Tinymce;