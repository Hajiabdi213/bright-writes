import multer from "multer";

// memory storage → req.file.buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
