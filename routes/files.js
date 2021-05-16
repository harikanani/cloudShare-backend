const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limit: {
        fileSize: 1000000 * 100
    },
}).single("myFile");

router.post("/", (req, res) => {
    
    upload(req, res, async (err) => {
        
        // validate request
        if(!req.file) {
            return res.json({ error: "Provide all required fields."});
        }


        if(err) {
            return res.status(500).send({ error: err.message });
        }
        
        // store into Database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });
    
        const response = await file.save();
        
        // response => link
        res.set('Access-Control-Allow-Origin', '*');
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
    
    });

});

router.post("/send", async (req, res) => {
    // validate request
    const { uuid, emailTo, emailFrom } = req.body;
    console.log(req.body);
    if(!uuid || !emailTo || !emailFrom) {
        console.log("provice all require fields.");
        return res.status(422).send({ error: "Provide all required fileds." });
    }

    // get data from database
    const file = await File.findOne({ uuid });

    if(file.sender) {
        console.log("email already sent");
        return res.status(422).send({ error: "Email already sent." });
    } 

    file.sender = emailFrom;
    file.receiver = emailTo;

    const response = await file.save();

    // send email
    const sendMail = require("../services/emailService");
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: "cloudShare file sharing",
        text: `${emailFrom} shared a file with you.`,
        html: require("../services/emailTemplate")({
            emailFrom, 
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + ' KB',
            expires: '24 hours'
        })
    });
    console.log("mail sent");
    res.set('Access-Control-Allow-Origin', '*');
    return res.send({ success: "true" });

});

module.exports = router;