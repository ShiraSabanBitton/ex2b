// Shira Saban Bitton - 316511658
// Fida Rabah - 204647911
// 12/3/24

// This server script uses Express to serve a profile page.
// It reads profile data from the file system and provides it to the client upon request.

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Serve the profile HTML page
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "profile.html"));
});

// Provide profile data in JSON format
app.get("/profile-data", (req, res) => {
    let id = req.query.id;
    let profilePath = path.join(__dirname, "private", id);

    fs.readdir(profilePath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading profile directory");
        }

        const textFiles = files.filter(file => file.startsWith("text") && file.endsWith(".txt"));
        let contentFiles = textFiles.map(file => fs.readFileSync(path.join(profilePath, file), "utf8"));

        let bioText = fs.readFileSync(path.join(profilePath, "bio.txt"), "utf8");
        const htmlBioContent = bioText.split(":");

        let fullTitleText = fs.readFileSync(path.join(profilePath, "title.txt"), "utf8");
        const [titleText, descText] = fullTitleText.split("\r\n");

        const privateFolder = path.join(__dirname, "private");
        const filesInPri = fs.readdirSync(privateFolder);
        const profilesNames = filesInPri.filter(file => fs.statSync(path.join(privateFolder, file)).isDirectory());

        res.json({
            id,
            descText,
            titleText,
            htmlBioContent,
            contentFiles,
            profilesNames
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
