export const mockData = {
  institutions: [
    { id: 1, name: "Universitas Gadjah Mada", code: "UGM", verified: true },
    { id: 2, name: "Institut Teknologi Bandung", code: "ITB", verified: true }
  ],
  certificates: [
    {
      id: 1,
      studentName: "Desi D Simamora",
      nim: "23/514990/TK/56564",
      program: "Teknologi Informasi",
      gpa: 3.85,
      graduationDate: "2024-07-15",
      institution: "Universitas Gadjah Mada",
      nftId: "0x1a2b3c4d5e6f",
      verified: true,
      ipfsHash: "QmX1Y2Z3...",
      transactionHash: "0xabcdef123456789...",
      blockNumber: 12345678,
      timestamp: "2024-07-15T10:30:00Z",
      oracleVerified: true
    }
  ],
  oracleFeeds: [
    {
      id: 1,
      feedName: "Academic Data Feed",
      status: "active",
      lastUpdate: "2024-06-04T12:00:00Z",
      dataPoints: 1247,
      accuracy: 99.8
    }
  ]
};