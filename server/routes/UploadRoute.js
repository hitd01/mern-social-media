import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, res, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    try {
        return res.json({
            success: true,
            message: 'File uploaded successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
});

export default router;
