# Notion API learning

This uses the Notion API to get information from a Notion database. 
Using the `localhost:51000/button` URL, you can hit the green button and the API will fetch data. 
It will display a table of the information from the Notion database that is chosen. This `table_id` is stored in the `.env` file.

## **Setup**
`npm install` 

`cp .env.example .env`

## **Find api key and database id**
1. API_KEY: Look at [this link](https://developers.notion.com/docs/create-a-notion-integration#getting-started)
2. Database_id will be between the first `/` and the first `?`. The bolded portion of this link shows where the `id` lives: https://www.notion.so/**19d1a1fbac3c8045b1h471f2637c4c88**?v=1b21a1fbac3c80938f67000ce1036a4b&pvs=4
3. Ask `Sully` if you're having trouble
4. Put those in their respective `.env` variable

## **Run Server**
`node server.js`

Should see `Example app listening on port 51000`

## **Press the button**
navigate to `localhost:51000/button`

press the button

### I hope this works for you!
