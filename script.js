const File = require("./models/file");
const fs = require("fs");
const connectDB = require("./config/db");

// make connection
connectDB();

const fetchData = async () => {
    
    // 24 hours old file fetch

    const pastDate = new Date(Date.now() - (24 * 60 * 60 * 1000));

    const files = await File.find({ createdAt: { $lt:  pastDate } })

    // delete files
    if(files.length) {
        try {
            for(const file of files) {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfully deleted ${file.filename}`);
            }
        } catch(error) {
            console.log(`Error while deleting file ${error}`);
        }
    }
    console.log(`Cron Job Done`);
}

fetchData().then(process.exit);