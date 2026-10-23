
const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 6000;
const client = new MongoClient("mongodb://127.0.0.1:27017");

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function sendHTML(res, status, html) {
    res.writeHead(status, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.end(html);
}

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        fs.createReadStream(path.join(__dirname, "home.html"))
            .on("error", () => {
                if (!res.headersSent) {
                    sendHTML(res, 500, "<h1>Could not load home.html</h1>");
                } else {
                    res.destroy();
                }
            })
            .pipe(res);

        return;
    }

    if (req.method === "POST" && req.url === "/server") {
        let rawData = "";

        req.on("data", chunk => {
            rawData += chunk;
            if (rawData.length > 100000) {
                req.destroy();
            }
        });

        req.on("end", async () => {
            try {
                const form = new URLSearchParams(rawData);

                const name = (form.get("name") || "").trim();
                const password = form.get("password") || "";
                const ageText = form.get("age") || "";
                const mobile = form.get("mobile") || "";
                const email = (form.get("email") || "").trim();
                const gender = form.get("gender") || "";
                const state = form.get("state") || "";
                const skills = form.getAll("skills");

                const validStates = [
                    "Kerala", "Tamil Nadu", "Karnataka",
                    "Andhra Pradesh", "Telangana", "Maharashtra"
                ];
                const validSkills = [
                    "Java Script", "Python", "C++", "Java"
                ];

                const age = Number(ageText);

                const valid =
                    name.length >= 2 && name.length <= 80 &&
                    password.length >= 8 && password.length <= 128 &&
                    ageText.trim() !== "" &&
                    Number.isInteger(age) && age >= 1 && age <= 120 &&
                    /^[0-9]{10}$/.test(mobile) &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                    ["Male", "Female"].includes(gender) &&
                    validStates.includes(state) &&
                    skills.length > 0 &&
                    skills.every(skill => validSkills.includes(skill));

                if (!valid) {
                    sendHTML(
                        res, 400,
                        "<h1>Invalid form data</h1><p>Please go back and check all fields.</p>"
                    );
                    return;
                }

                const users = client.db("registrationDB").collection("users");

                // For this lab demonstration only.
                // Never store plaintext passwords in a real application.
                const user = {
                    name,
                    password,
                    age,
                    mobile,
                    email,
                    gender,
                    state,
                    skills,
                    createdAt: new Date()
                };

                const result = await users.insertOne(user);
                const savedUser = await users.findOne({
                    _id: result.insertedId
                });

                const details = [
                    ["Name", savedUser.name],
                    ["Password", savedUser.password],
                    ["Age", savedUser.age],
                    ["Mobile Number", savedUser.mobile],
                    ["Email", savedUser.email],
                    ["Gender", savedUser.gender],
                    ["State", savedUser.state],
                    ["Skills", savedUser.skills.join(", ")]
                ];

                const rows = details.map(([label, value]) => `
                    <tr>
                        <th>${escapeHTML(label)}</th>
                        <td>${escapeHTML(value)}</td>
                    </tr>
                `).join("");

                sendHTML(res, 200, `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, initial-scale=1">
                        <title>User Submitted Details</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                max-width: 700px;
                                margin: 40px auto;
                                padding: 20px;
                                background: #f2f5f9;
                            }
                            h1 { text-align: center; }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                background: white;
                            }
                            th, td {
                                border: 1px solid #ccc;
                                padding: 12px;
                                text-align: left;
                                overflow-wrap: anywhere;
                            }
                            th {
                                background: #e4edf7;
                                width: 35%;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>User Submitted Details</h1>
                        <table><tbody>${rows}</tbody></table>
                        <p><a href="/">Register another user</a></p>
                    </body>
                    </html>
                `);

            } catch (error) {
                console.error("Form processing error:", error);
                if (!res.headersSent) {
                    sendHTML(res, 500,
                        "<h1>Unable to save registration</h1><p>Check the terminal.</p>");
                }
            }
        });

        return;
    }

    sendHTML(res, 404, "<h1>404 - Page Not Found</h1>");
});

async function startServer() {
    try {
        await client.connect();
        await client.db("registrationDB").command({ ping: 1 });

        console.log("Connected to MongoDB successfully.");

        server.listen(PORT, "127.0.0.1", () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        await client.close().catch(() => {});
        process.exitCode = 1;
    }
}

startServer();

async function shutdown() {
    server.close();
    await client.close().catch(() => {});
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
