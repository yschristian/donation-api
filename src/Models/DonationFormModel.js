const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    kidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kid'
    },
    FullNames: {
      type: String,
    },
    email: {
      type: String,
    },
    Location: {
      type: String,
    },  
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
