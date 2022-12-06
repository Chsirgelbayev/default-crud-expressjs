import multer from 'multer';
import path from 'path';
import { BadRequestException } from '../common/exceptions/bad-request.exception';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/static');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploadFile = multer({
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 },

    onError: (err, next) => {
        next(err);
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(
            new BadRequestException(
                `Format ${path.extname(
                    file.originalname
                )} is not available available! Select jpeg, jpg, png format!`
            )
        );
    }
}).single('photo');
