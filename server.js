
const express = require("express");

const dotenv = require('dotenv');
dotenv.config();
const path = require("path");

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const bodyParser = require('body-parser');


app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/button', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'button.html'));
});

// Function to get database entries
async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID, 
      page_size: 6,
    });
    const results = response.results.map((page) => {
      return page.properties["Order Status"]?.select?.name || "No Status";
    });
    
    return results;
    
  } catch (error) {
    console.error("Error fetching database:", error);
  }
}

app.get('/api/data', async (req, res) => {
  try{
    const data = await getDatabase();
    res.json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});