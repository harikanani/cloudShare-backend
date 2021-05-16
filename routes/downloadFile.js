const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid});

        // check if file exists
        if(!file) {
            return res.render("download", { error: "Link has been expired." });
        }

        // download file to client
        const filePath = `${__dirname}/../${file.path}`;
        return res.download(filePath);

    } catch(error) {
        return res.status(500).send({ error });
    }

});

module.exports = router;