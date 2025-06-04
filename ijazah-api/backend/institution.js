const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const institutionSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true,
    maxlength: [200, 'Institution name cannot exceed 200 characters']
  },
  
  code: {
    type: String,
    required: [true, 'Institution code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [10, 'Institution code cannot exceed 10 characters']
  },
  
  type: {
    type: String,
    required: [true, 'Institution type is required'],
    enum: ['University', 'College', 'Institute', 'Academy', 'School']
  },
  
  // Contact Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  
  // Address Information
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State/Province is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required']
    }
  },
  
  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  
  // Blockchain Information
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    unique: true,
    match: [/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address']
  },
  
  // Authorization & Verification
  authorized: {
    type: Boolean,
    default: false
  },
  
  authorizedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  
  authorizedDate: Date,
  
  verificationDocuments: [{
    type: {
      type: String,
      enum: ['license', 'accreditation', 'registration', 'other']
    },
    documentUrl: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: false
    }
  }],
  
  // Statistics
  certificatesIssued: {
    type: Number,
    default: 0
  },
  
  totalStudents: Number,
  foundedYear: Number,
  
  // Status
  active: {
    type: Boolean,
    default: true
  },
  
  suspended: {
    type: Boolean,
    default: false
  },
  
  suspensionReason: String,
  suspensionDate: Date,
  
  // API Configuration
  apiKey: {
    type: String,
    unique: true
  },
  
  apiEndpoint: String,
  
  // Security
  lastLogin: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Additional Information
  description: String,
  logo: String,
  accreditation: [{
    body: String,
    number: String,
    validUntil: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
institutionSchema.index({ code: 1 });
institutionSchema.index({ email: 1 });
institutionSchema.index({ walletAddress: 1 });
institutionSchema.index({ authorized: 1 });
institutionSchema.index({ active: 1 });

// Virtual for full address
institutionSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.postalCode}, ${this.address.country}`;
});

// Virtual for institution age
institutionSchema.virtual('institutionAge').get(function() {
  if (this.foundedYear) {
    return new Date().getFullYear() - this.foundedYear;
  }
  return null;
});

// Pre-save middleware to hash password
institutionSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre-save middleware to generate API key
institutionSchema.pre('save', function(next) {
  if (this.isNew && !this.apiKey) {
    const crypto = require('crypto');
    this.apiKey = crypto.randomBytes(32).toString('hex');
  }
  next();
});

// Instance method to check password
institutionSchema.methods.checkPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT token
institutionSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      code: this.code,
      type: 'institution'
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Instance method to generate password reset token
institutionSchema.methods.getResetPasswordToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Static method to find authorized institutions
institutionSchema.statics.findAuthorized = function() {
  return this.find({ authorized: true, active: true, suspended: false });
};

// Instance method to increment certificates issued
institutionSchema.methods.incrementCertificates = function() {
  this.certificatesIssued += 1;
  return this.save();
};

// Instance method to authorize institution
institutionSchema.methods.authorize = function(authorizedBy) {
  this.authorized = true;
  this.authorizedBy = authorizedBy;
  this.authorizedDate = new Date();
  return this.save();
};

// Instance method to suspend institution
institutionSchema.methods.suspend = function(reason) {
  this.suspended = true;
  this.suspensionReason = reason;
  this.suspensionDate = new Date();
  this.active = false;
  return this.save();
};

module.exports = mongoose.model('Institution', institutionSchema);
