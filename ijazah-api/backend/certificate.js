const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  // Student Information
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Student name cannot exceed 100 characters']
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true,
    unique: true
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  // Academic Information
  institution: {
    name: {
      type: String,
      required: [true, 'Institution name is required']
    },
    code: {
      type: String,
      required: [true, 'Institution code is required']
    },
    address: String,
    website: String
  },
  
  degree: {
    type: {
      type: String,
      required: [true, 'Degree type is required'],
      enum: ['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certificate']
    },
    field: {
      type: String,
      required: [true, 'Field of study is required']
    },
    major: String,
    gpa: {
      type: Number,
      min: [0, 'GPA cannot be negative'],
      max: [4, 'GPA cannot exceed 4.0']
    }
  },
  
  // Academic Period
  academicYear: {
    start: {
      type: Number,
      required: [true, 'Academic start year is required']
    },
    end: {
      type: Number,
      required: [true, 'Academic end year is required']
    }
  },
  
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required'],
    default: Date.now
  },
  
  graduationDate: {
    type: Date,
    required: [true, 'Graduation date is required']
  },
  
  // Blockchain Information
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    match: [/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address']
  },
  
  tokenId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  blockchainTxHash: {
    type: String,
    unique: true,
    sparse: true
  },
  
  contractAddress: {
    type: String,
    match: [/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid contract address']
  },
  
  // IPFS Information
  ipfsHash: {
    type: String,
    unique: true,
    sparse: true
  },
  
  metadataUri: String,
  
  // Verification Status
  verified: {
    type: Boolean,
    default: false
  },
  
  verificationDate: Date,
  
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  },
  
  // Oracle Information
  oracleRequestId: String,
  oracleVerified: {
    type: Boolean,
    default: false
  },
  oracleTimestamp: Date,
  
  // Status Tracking
  status: {
    type: String,
    enum: ['pending', 'processing', 'issued', 'verified', 'revoked'],
    default: 'pending'
  },
  
  // Additional Metadata
  metadata: {
    honors: String,
    specialRecognition: [String],
    transcript: {
      courses: [{
        name: String,
        code: String,
        credits: Number,
        grade: String
      }],
      totalCredits: Number
    }
  },
  
  // Security Features
  digitalSignature: String,
  certificateHash: {
    type: String,
    unique: true
  },
  
  // Revocation Information
  revoked: {
    type: Boolean,
    default: false
  },
  revokedDate: Date,
  revokedReason: String,
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
certificateSchema.index({ studentId: 1 });
certificateSchema.index({ walletAddress: 1 });
certificateSchema.index({ 'institution.code': 1 });
certificateSchema.index({ tokenId: 1 });
certificateSchema.index({ blockchainTxHash: 1 });
certificateSchema.index({ status: 1 });
certificateSchema.index({ verified: 1 });
certificateSchema.index({ createdAt: -1 });

// Virtual for certificate age
certificateSchema.virtual('certificateAge').get(function() {
  return Math.floor((Date.now() - this.issueDate) / (1000 * 60 * 60 * 24));
});

// Virtual for blockchain explorer URL
certificateSchema.virtual('explorerUrl').get(function() {
  if (this.blockchainTxHash) {
    return `https://goerli.etherscan.io/tx/${this.blockchainTxHash}`;
  }
  return null;
});

// Pre-save middleware to generate certificate hash
certificateSchema.pre('save', function(next) {
  if (this.isModified() && !this.certificateHash) {
    const crypto = require('crypto');
    const dataToHash = `${this.studentId}-${this.institution.code}-${this.degree.type}-${this.issueDate}`;
    this.certificateHash = crypto.createHash('sha256').update(dataToHash).digest('hex');
  }
  next();
});

// Static method to find certificates by institution
certificateSchema.statics.findByInstitution = function(institutionCode) {
  return this.find({ 'institution.code': institutionCode });
};

// Static method to find verified certificates
certificateSchema.statics.findVerified = function() {
  return this.find({ verified: true, revoked: false });
};

// Instance method to revoke certificate
certificateSchema.methods.revoke = function(reason, revokedBy) {
  this.revoked = true;
  this.revokedDate = new Date();
  this.revokedReason = reason;
  this.revokedBy = revokedBy;
  this.status = 'revoked';
  return this.save();
};

// Instance method to verify certificate
certificateSchema.methods.verify = function(verifiedBy) {
  this.verified = true;
  this.verificationDate = new Date();
  this.verifiedBy = verifiedBy;
  this.status = 'verified';
  return this.save();
};

module.exports = mongoose.model('Certificate', certificateSchema);