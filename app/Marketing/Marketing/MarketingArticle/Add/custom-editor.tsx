'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CKBox,
    CKBoxImageEdit,
    CloudServices,
    Code,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    PictureEditing,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    Title,
    TodoList,
    Underline,
    Undo,
    SimpleUploadAdapter,
    EasyImage,
    Image
} from 'ckeditor5';
import { AIAssistant, ExportPdf, ExportWord, ImportWord, OpenAITextAdapter } from 'ckeditor5-premium-features';

import translations from 'ckeditor5/translations/vi.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/vi.js';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import useCookie from '@/app/(user-global)/component/hook/useCookie';
import { useEffect, useState } from 'react';

const CkediterCustom: React.FC = () => {
    const token = useCookie('token')
    const tokenImg = process.env.NEXT_PUBLIC_TOKEN_IMAGE

    const licenseKey = 'RmtGcTJLcjZLMVluN1NUb1EvS1dwV01tRUlBeXZMejNiV2dzZHpWZ0tranFKalBFOG9SeHMzaFJMaWg2M2c9PS1NakF5TkRFeU1UZz0=';

    const handleEditorChange = (_: any, editor: any) => {
        const data = editor.getData();
        console.log({ data });
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p>Nhập nội dung bài viết tại đây...</p>"
            onChange={handleEditorChange}
            config={{
                licenseKey: licenseKey,
                cloudServices: {
                    tokenUrl: 'https://123319.cke-cs.com/token/dev/35d1d27f0e9e385c53edf0d6b267c2f4b82c737a333c23aec4e4bebc4f8e?limit=10',
                    uploadUrl: 'https://123319.cke-cs.com/easyimage/upload/'
                },
                plugins: [
                    AccessibilityHelp, Autoformat, AutoImage, Autosave, BlockQuote, Bold, CKBox, CKBoxImageEdit,
                    CloudServices, Code, Essentials, FindAndReplace, FontBackgroundColor, FontColor, FontFamily,
                    FontSize, FullPage, GeneralHtmlSupport, Heading, Highlight, HtmlComment, HtmlEmbed, ImageBlock,
                    ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
                    ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties, Markdown,
                    MediaEmbed, Mention, PageBreak, Paragraph, PasteFromMarkdownExperimental, PasteFromOffice, PictureEditing,
                    RemoveFormat, SelectAll, ShowBlocks, SourceEditing, SpecialCharacters, SpecialCharactersArrows,
                    SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical,
                    SpecialCharactersText, Strikethrough, Subscript, Superscript, Table, TableCaption, TableCellProperties,
                    TableColumnResize, TableProperties, TableToolbar, TextPartLanguage, TextTransformation, Title, TodoList,
                    Underline, Undo, ExportPdf, ExportWord, ImportWord, SimpleUploadAdapter, EasyImage, Image
                ],
                toolbar: [
                    "undo", "redo",
                    "|",
                    "heading",
                    "|",
                    "bold", "italic", "underline", "strikethrough",
                    "|",
                    "fontFamily", "fontSize", "fontColor", "fontBackgroundColor",
                    "|",
                    "link", "imageUpload", "insertTable", "mediaEmbed",
                    "|",
                    "alignment:left", "alignment:center", "alignment:right", "alignment:justify",
                    "|",
                    "highlight", "blockQuote", "code", "sourceEditing", "showBlocks",
                    "|",
                    "bulletedList", "numberedList", "todoList",
                    "|",
                    "pageBreak", "specialCharacters", "findAndReplace",
                    "|",
                    "exportPdf", "exportWord", "importWord",
                ],
                alignment: {
                    options: ["left", "center", "right", "justify"],
                },
                mediaEmbed: {
                    previewsInData: true,
                },
                image: {
                    toolbar: [
                        'toggleImageCaption', 'imageTextAlternative', 'ckboxImageEdit',"resizeImage", "imageTextAlternative", "imageStyle:inline", "imageStyle:block", "imageStyle:side"
                    ],
                    resizeUnit: "%",
                    resizeOptions: [{
                        name: 'resizeImage:original',
                        value: null
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75'
                    }],
                },
                language: {
                    ui: 'vi',
                    content: 'vi'
                },
            }}
        />
    )
}

export default CkediterCustom