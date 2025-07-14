const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');


const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const verifyPassword = async (pass, hashedString) => {
  return await bcrypt.compare(pass, hashedString);
};

const generateToken = async (id, email) => {
  return jwt.sign({ id, email }, process.env.PRIVATEKEY);
};


const colors = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  text: '#1e293b',
  lightGray: '#f1f5f9'
};

const statusColors = {
  PENDING: colors.warning,
  INPROGRESS: colors.primary,
  RESOLVED: colors.accent
};
const priorityColors = {
  LOW: colors.accent,
  MEDIUM: colors.warning,
  HIGH: colors.danger
};

const generateAppHeader = async (doc,reportDetails) => {
  // Main border
  doc
    .strokeColor(colors.primary)
    .lineWidth(2)
    .rect(50, 30, 500, 740)
    .stroke();

  // Header background
  doc
    .fillColor(colors.primary)
    .rect(50, 30, 500, 60)
    .fill();

  // Logo placeholder
  doc
    .image(path.join(__dirname,"../public/randlogo.png"),60,35,{width:50,height:50})

  // Title
  doc
    .fillColor('#ffffff')
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Infrastructure Problem Report', 120, 50, {
      width: 350,
      align: 'center'
    });

  // Report ID
  doc
    .fillColor(colors.danger)
    .fontSize(10)
    .font('Helvetica')
    .text(`Report ID: ${reportDetails.id.substring(0, 20)}`, 420, 65);
};

const generatePostPdfDoc = async (reportDetails) => {
  let doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: `Report - ${reportDetails.title}`,
      Author: 'Crowdsourced Public Infrastructure Monitoring System',
      CreationDate: new Date(),
      Subject: 'Infrastructure Problem Report'
    },
  });

  // Header
  await generateAppHeader(doc,reportDetails);

  let yPos = 110;

  // Title Section
  doc
    .fillColor(colors.text)
    .fontSize(14)
    .font('Helvetica-Bold')
    .text('Report Details', 60, yPos);

  yPos += 25;

  // Status and Priority badges
  const statusColor = statusColors[reportDetails.status] || colors.secondary;
  const priorityColor = priorityColors[reportDetails.priority] || colors.secondary;

  doc
    .fillColor(statusColor)
    .roundedRect(60, yPos, 70, 18, 4)
    .fill()
    .fillColor('#ffffff')
    .fontSize(9)
    .font('Helvetica-Bold')
    .text(reportDetails.status, 60, yPos + 6, { width: 70, align: 'center' });

  doc
    .fillColor(priorityColor)
    .roundedRect(140, yPos, 70, 18, 4)
    .fill()
    .fillColor('#ffffff')
    .fontSize(9)
    .font('Helvetica-Bold')
    .text(`${reportDetails.priority}`, 140, yPos + 6, { width: 70, align: 'center' });

  // Date
  doc
    .fillColor(colors.secondary)
    .fontSize(10)
    .font('Helvetica')
    .text(`Date: ${new Date(reportDetails.createdAt).toLocaleDateString()}`, 400, yPos + 4);

  yPos += 35;

  // Title
  doc
    .fillColor(colors.text)
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Title: ', 60, yPos, { continued: true })
    .font('Helvetica')
    .text(reportDetails.title, { width: 480 });

  yPos += 25;

  // Description
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Description:', 60, yPos);

  yPos += 15;

   doc
    .fontSize(10)
    .font('Helvetica')
    .text(reportDetails.description, 60, yPos, { 
      width: 300, 
      height: 120,
      lineGap: 2
    });

  // Image Section (right side)
  const imageX = 380;
  const imageY = yPos - 15;
  const imageWidth = 200;
  const imageHeight = 180;

  // Image placeholder or actual image
  try {
    if (reportDetails.media && reportDetails.media.length > 0) {
      const imagePath = path.join(__dirname,"../public/post1.jpg");
      if (fs.existsSync(path.join(__dirname,"../public/post1.jpg"))) {
        doc.strokeColor(colors.warning).circle(imageX,imageY,10).image(imagePath, imageX, imageY, {
          width: imageWidth,
          height: imageHeight,
          fit: [imageWidth, imageHeight]
        }).stroke();
      } else {
        // Image placeholder
        doc
          .fillColor(colors.lightGray)
          .rect(imageX, imageY, imageWidth, imageHeight)
          .fill()
          .strokeColor(colors.secondary)
          .rect(imageX, imageY, imageWidth, imageHeight)
          .stroke()
          .fillColor(colors.secondary)
          .fontSize(10)
          .font('Helvetica')
          .text('No Image Available', imageX, imageY + 55, {
            width: imageWidth,
            align: 'center'
          });
      }
    } else {
      // No media placeholder
      doc
        .fillColor(colors.lightGray)
        .rect(imageX, imageY, imageWidth, imageHeight)
        .fill()
        .strokeColor(colors.secondary)
        .rect(imageX, imageY, imageWidth, imageHeight)
        .stroke()
        .fillColor(colors.secondary)
        .fontSize(10)
        .font('Helvetica')
        .text('No Image Attached', imageX, imageY + 55, {
          width: imageWidth,
          align: 'center'
        });
    }
  } catch (error) {
    doc
      .fillColor(colors.lightGray)
      .rect(imageX, imageY, imageWidth, imageHeight)
      .fill()
      .strokeColor(colors.secondary)
      .rect(imageX, imageY, imageWidth, imageHeight)
      .stroke()
      .fillColor(colors.secondary)
      .fontSize(10)
      .font('Helvetica')
      .text('Image Error', imageX, imageY + 55, {
        width: imageWidth,
        align: 'center'
      });
  }

  yPos += 140;

  // Separator line
  doc
    .strokeColor(colors.lightGray)
    .lineWidth(1)
    .moveTo(60, yPos)
    .lineTo(540, yPos)
    .stroke();

  yPos += 20;

  // Reporter Information
  doc
    .fillColor(colors.text)
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Reporter Information', 60, yPos);

  yPos += 20;

  const userName = `${reportDetails.user.FirstName} ${reportDetails.user.lastName}`;
  
  // User details in two columns
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Name:', 60, yPos)
    .font('Helvetica')
    .text(userName, 100, yPos)
    .font('Helvetica-Bold')
    .text('Contact:', 300, yPos)
    .font('Helvetica')
    .text(reportDetails.user.contact, 340, yPos);

  yPos += 15;

  doc
    .font('Helvetica-Bold')
    .text('Email:', 60, yPos)
    .font('Helvetica')
    .text(reportDetails.user.email, 100, yPos, { width: 200 });

  // Verification status
  const verificationColor = reportDetails.user.isVerified ? colors.accent : colors.danger;
  const verificationText = reportDetails.user.isVerified ? 'Verified' : 'Not Verified';
  
  doc
    .fillColor(verificationColor)
    .roundedRect(300, yPos - 2, 60, 16, 3)
    .fill()
    .fillColor('#ffffff')
    .fontSize(8)
    .font('Helvetica-Bold')
    .text(verificationText, 300, yPos + 2, { width: 60, align: 'center' });

  yPos += 30;

  // Location Information (if available)
  if (reportDetails.location) {
    doc
      .fillColor(colors.text)
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Location', 60, yPos);

    yPos += 15;

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`Coordinates: ${reportDetails.location.latitude.toFixed(4)}, ${reportDetails.location.longitude.toFixed(4)}`, 60, yPos);

    if (reportDetails.location.address) {
      yPos += 12;
      doc.text(`Address: ${reportDetails.location.address}`, 60, yPos, { width: 400 });
    }

    yPos += 25;
  }

  // Infrastructure Information (if available)
  if (reportDetails.infrastructure) {
    doc
      .fillColor(colors.text)
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Infrastructure', 60, yPos);

    yPos += 15;

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`Type: ${reportDetails.infrastructure.type}`, 60, yPos)
      .text(`Name: ${reportDetails.infrastructure.name}`, 200, yPos);

    yPos += 25;
  }

  // Footer
  doc
    .fillColor(colors.lightGray)
    .rect(50, 750, 500, 20)
    .fill()
    .fillColor(colors.secondary)
    .fontSize(8)
    .font('Helvetica')
    .text('© 2024 CrowdSourced Infrastructure Monitoring System', 60, 758)
    .text(`Generated: ${new Date().toLocaleDateString()}`, 420, 758);

  return doc;
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  generatePostPdfDoc,
};
