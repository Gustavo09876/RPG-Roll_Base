// filepath: c:\Users\b5944\OneDrive\Área de Trabalho\Git Hub\RPG Roll_Base\RPG-Roll_Base\BackEnd\src\modules\table\middlewares\upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "..", "uploads")); // salva em src/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
