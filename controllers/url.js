const  shortid  = require("shortid");
const URL = require('../models/url');

async function generateNewShortURL(req, res) {
        const { url } = req.body;
    
        if (!url) {
            return res.status(400).json({ msg: "Please provide a URL" });
        }
    
        try {
            const shortID = shortid.generate() // Corrected: Generate a unique short ID
    
            await URL.create({
                shortUrl: shortID,
                redirectedUrl: url,
                visitHistory: []
            });
    
            return res.json({ id: shortID }); // Corrected: Return the generated short ID
        } catch (err) {
            console.error(err); // Optional: Log the error for debugging
            return res.status(500).json({ msg: "Error in creating URL" });
        }
    }

async function totalClicks(req,res){
        const shortID= req.params.shortID;
        const result = await URL.findOne({shortUrl:shortID})
        return res.json({totalClick:result.visitHistory.length});
}


module.exports = { generateNewShortURL ,totalClicks};
    

