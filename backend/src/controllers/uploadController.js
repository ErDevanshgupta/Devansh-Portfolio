const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // req.file.path contains the secure cloudinary URL due to multer-storage-cloudinary
    res.status(200).json({ success: true, url: req.file.path });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage };
