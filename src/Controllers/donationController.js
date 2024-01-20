const { get } = require('mongoose');
const Donation = require('../Models/DonationFormModel');

const createDonation = async (req, res) => {
    try {
        const { kidId, FullNames, email, Location, phoneNumber } = req.body;
        const donation = await Donation.create({ kidId, FullNames, email, Location, phoneNumber });
        return res.status(201).json({
            donation,
        });
    } catch (error) {
        console.log(error)
    }
}

const  getAllDonations = async (req, res) => {
    try{
        const donations = await Donation.find();
        return res.status(200).json({ donations });
    }catch(error){
        console.log(error)
    }
}

const getDonationById = async (req, res) => {
    try{
        const { id } = req.params;
        const donation = await Donation.findById(id);
        if(donation){
            return res.status(200).json({ donation });
        }
        return res.status(404).send('Donation with the specified ID does not exists');
    }catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createDonation,
    getAllDonations,
    getDonationById
}