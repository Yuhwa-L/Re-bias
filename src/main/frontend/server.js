const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

// Initialize OpenAI client (it automatically reads the API key from environment variables)
const openai = new OpenAI();

// Parse JSON request bodies and serve static files (like HTML)
app.use(express.json());
app.use(express.static(__dirname)); // Serve files in the current directory

// Default route: serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// '/analyze' endpoint: handle bias-analysis requests
app.post('/analyze', async (req, res) => {
    const { script } = req.body; // Script text sent from the client HTML

    if (!script) {
        return res.status(400).json({ error: 'No script text provided for analysis.' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-5",

            // Force AI to respond strictly in JSON format
            response_format: { type: "json_object" },

            messages: [
                {
                    role: "system",
                    content: `
                        You are a media-bias analysis expert.
                        Analyze the provided script and determine its bias level as a number between 0 and 100.
                        Then explain clearly why you rated it that way. Process it fast as you can.
                        Your response MUST follow this exact JSON format:
                        {
                          "biasPercentage": <number>,
                          "reasoning": "<string>"
                        }
                    `
                },
                {
                    role: "user",
                    content: `Analyze the following script:\n\n"""${script}"""`
                }
            ]
        });

        // Parse the AI’s JSON response and send it back to the client
        const analysisResult = JSON.parse(completion.choices[0].message.content);
        res.json(analysisResult);

    } catch (error) {
        console.error('Error while calling the OpenAI API:', error);
        res.status(500).json({ error: 'An error occurred during AI analysis.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Open http://localhost:3000 in your browser.');
});
