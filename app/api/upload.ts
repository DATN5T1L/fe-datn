import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';
import { Readable } from 'stream';

// Cấu hình Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Cấu hình để xử lý file upload
export const config = {
  api: {
    bodyParser: false, // Tắt bodyParser vì chúng ta sẽ tự xử lý file upload
  },
};

// Định nghĩa kiểu cho thông tin tệp đã tải lên
interface UploadedFile {
  fieldname: string;
  filename: string;
  saveTo: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Sử dụng Busboy đúng cách
    const busboy = Busboy({ headers: req.headers });

    // Mảng lưu trữ tệp đã tải lên
    const fileFields: UploadedFile[] = [];

    // Lắng nghe sự kiện 'file' để xử lý các tệp tải lên
    busboy.on('file', (fieldname: string, file: Readable, filename: string, encoding: string, mimetype: string) => {
      // Tạo đường dẫn lưu trữ tệp tải lên
      const saveTo = path.join(process.cwd(), 'public', 'uploads', filename);

      // Tạo stream để ghi tệp vào thư mục lưu trữ
      file.pipe(fs.createWriteStream(saveTo));

      // Lưu thông tin tệp vào mảng fileFields
      fileFields.push({ fieldname, filename, saveTo });
    });

    // Lắng nghe sự kiện 'finish' khi quá trình tải lên hoàn thành
    busboy.on('finish', () => {
      // Kiểm tra xem có tệp nào được tải lên không
      if (fileFields.length === 0) {
        return res.status(400).json({ message: 'Không có tệp nào được tải lên!' });
      }

      // Tải ảnh lên Cloudinary
      const filePath = fileFields[0].saveTo;
      cloudinary.v2.uploader.upload(filePath, { upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET })
        .then((result) => {
          // Trả về URL của ảnh đã tải lên Cloudinary
          res.status(200).json({ url: result.secure_url });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Lỗi tải ảnh lên Cloudinary', error: err });
        });
    });

    // Đưa req vào busboy để bắt đầu xử lý dữ liệu
    req.pipe(busboy);
  } else {
    res.status(405).json({ message: 'Phương thức không hợp lệ' });
  }
}
