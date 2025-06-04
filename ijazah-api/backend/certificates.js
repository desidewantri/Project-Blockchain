<<<<<<< HEAD
// Upload metadata to IPFS
try {
  const metadata = {
    name: `${certificate.degree.type} in ${certificate.degree.field}`,
    description: `Digital certificate issued by ${certificate.institution.name}`,
    image: `https://certificates.com/images/${certificate._id}`,
    attributes: [
      { trait_type: "Student", value: certificate.studentName },
      { trait_type: "Institution", value: certificate.institution.name },
      { trait_type: "Degree Type", value: certificate.degree.type },
      { trait_type: "Field of Study", value: certificate.degree.field },
      { trait_type: "Issue Date", value: certificate.issueDate.toISOString() },
      { trait_type: "Graduation Date", value: certificate.graduationDate.toISOString() }
    ]
  };

  const ipfsHash = await ipfsService.uploadMetadata(metadata);
  certificate.ipfsHash = ipfsHash;
  await certificate.save();
} catch (err) {
  console.error('IPFS upload failed:', err.message);
  // lanjut aja atau lempar error, sesuai strategi sistem
}
=======
// Upload metadata to IPFS
try {
  const metadata = {
    name: `${certificate.degree.type} in ${certificate.degree.field}`,
    description: `Digital certificate issued by ${certificate.institution.name}`,
    image: `https://certificates.com/images/${certificate._id}`,
    attributes: [
      { trait_type: "Student", value: certificate.studentName },
      { trait_type: "Institution", value: certificate.institution.name },
      { trait_type: "Degree Type", value: certificate.degree.type },
      { trait_type: "Field of Study", value: certificate.degree.field },
      { trait_type: "Issue Date", value: certificate.issueDate.toISOString() },
      { trait_type: "Graduation Date", value: certificate.graduationDate.toISOString() }
    ]
  };

  const ipfsHash = await ipfsService.uploadMetadata(metadata);
  certificate.ipfsHash = ipfsHash;
  await certificate.save();
} catch (err) {
  console.error('IPFS upload failed:', err.message);
  // lanjut aja atau lempar error, sesuai strategi sistem
}
>>>>>>> 280ce42ddcdf8389bd05be6c814ed96c580eaff8
