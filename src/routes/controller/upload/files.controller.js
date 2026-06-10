import path from "path";
import multer from "multer";
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
      // Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });

const homePage = (req, res) => {
  return res.send("this is de the home page");
};

const uploadFiles = (req, _res, _next) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
};

export { homePage,
  uploadFiles,
  upload, };