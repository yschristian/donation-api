const Kid = require('../Models/KidModel');
const cloudinary = require('../Helpers/cloudinary');

const createKid = async (req, res) => {
    const { Location, FullNames, dascription, dateOfBirth, phoneNumber } = req.body;
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const kid = await Kid.create({ 
            Location, 
            FullNames, 
            dascription, 
            dateOfBirth, 
            phoneNumber, 
            photo: result.secure_url,
        });
        return res.status(201).json({
            kid,
        });
    }catch(e){
        console.log(e)
    }
}

const getAllKids = async (req, res) => {
    try{
        const kids = await Kid.find();
        return res.status(200).json({ kids });
    }catch(error){
        return res.status(500).send(error.message);
    }
}

const getKidById = async (req, res) => {
    try{
        const { id } = req.params;
        const kid = await Kid.findById(id);
        if(kid){
            return res.status(200).json({ kid });
        }
        return res.status(404).send('Kid with the specified ID does not exists');
    }catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports={
    createKid,
    getAllKids,
    getKidById
}