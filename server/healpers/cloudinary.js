const cloudinary = require('cloudinary').v2
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dxtkh85la',
    api_key :'192423595539454',
    api_secret : 'Z8FybVjpElwur5FiHhdGQPYypP4'
})

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file ,{
        resource_type : 'auto'
    } )
    return result;
}

const upload = multer({storage});
module.exports = {upload , ImageUploadUtil}