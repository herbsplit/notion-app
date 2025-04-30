require('dotenv').config();
const { Client } = require('@notionhq/client');
const { get } = require('http');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Function to get database entries


async function getTable() {
  const results = [];

  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    // Step 1: Get headings
    const headresponse = await notion.databases.retrieve({ database_id: databaseId });
    const headings = Object.keys(headresponse.properties);

    // Step 2: Query the database
    const dataresponse = await notion.databases.query({
      database_id: databaseId,
      page_size: 2, // or more if you want
    });
    // Step 3: Process results
    dataresponse.results.forEach((page) => {
      const result = {};

      headings.forEach((heading) => {
        const property = page.properties[heading];

        if (!property) {
          result[heading] = null;
          return;
        }

        switch (property.type) {
          case 'title':
            result[heading] = property.title.map(part => part.plain_text).join('');
            break;
          case 'unique_id':
            const prefix = property.unique_id?.prefix ?? '';
            const number = property.unique_id?.number ?? null;
            result[heading] = number !== null ? `${prefix}${number}` : null;
            break;
          case 'rich_text':
            result[heading] = property.rich_text.map(part => part.plain_text).join('');
            break;
          case 'number':
            result[heading] = property.number;
            break;
          case 'select':
            result[heading] = property.select?.name || null;
            break;
          case 'status':
            result[heading] = property.status?.name || null;
              break;
          case 'multi_select':
            result[heading] = property.multi_select.map(option => option.name);
            break;
          case 'date':
            result[heading] = property.date?.start || null;
            break;
          case 'checkbox':
            result[heading] = property.checkbox;
            break;
          case 'url':
            result[heading] = property.url;
            break;
          case 'email':
            result[heading] = property.email;
            break;
          case 'phone_number':
            result[heading] = property.phone_number;
            break;
          case 'people':
            result[heading] = property.people.map(person => person.name || person.id);
            break;
          case 'files':
            result[heading] = property.files.map(file => file.name || file.external?.url || file.file?.url);
            break;
          case 'formula':
            result[heading] = property.formula.string ?? property.formula.number ?? property.formula.boolean ?? null;
            break;
          case 'relation':
            result[heading] = property.relation.map(rel => rel.id);
            break;
          case 'rollup':
  if (property.rollup.type === 'array') {
    result[heading] = property.rollup.array.map(item => {
      // If item is a stringified JSON object, parse it
      let parsedItem;
      try {
        parsedItem = typeof item === 'string' ? JSON.parse(item) : item;
      } catch (err) {
        return '[Invalid JSON]';
      }

      if (parsedItem?.type === 'formula') {
        return parsedItem.formula?.string ?? parsedItem.formula?.number ?? parsedItem.formula?.boolean ?? '[Empty Formula]';
      }

      // Other known types (optional fallback)
      if (parsedItem.type === 'title') {
        return parsedItem.title?.map(part => part.plain_text).join('');
      }
      if (parsedItem.type === 'rich_text') {
        return parsedItem.rich_text?.map(part => part.plain_text).join('');
      }
      if (parsedItem?.type === 'unique_id') {
        const prefix = parsedItem.unique_id?.prefix ?? '';
        const number = parsedItem.unique_id?.number ?? null;
        return number !== null ? `${prefix}${number}` : null;
      }
      return '[Unsupported rollup item]';
    });
  } else if (property.rollup.type === 'number') {
    result[heading] = property.rollup.number;
  } else if (property.rollup.type === 'date') {
    result[heading] = property.rollup.date?.start;
  } else {
    result[heading] = `[Unsupported rollup type: ${property.rollup.type}]`;
  }
  break;
  default:
    result[heading] = `[Unsupported property type: ${property.type}]`;
        }
      });
      results.push(result)
      // console.log(result)
      
    });
    
    return { headings, results };
  } catch (error) {
    console.error("Error fetching database:", error);
  }
}


getTable().then( table => {
  console.log(JSON.stringify(table["results"][1],null,2));
});






async function tableData(headers) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID, 
      page_size: 1,
    });
    
    

  } catch (error) {
    console.error("Error fetching database:", error);
  }
}

async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID, page_size: 1,
    });
    console.log("Database entries:");
    response.results.forEach((page) => {
      const orderStatus = page.properties["Fulfillment Status"]?.select?.name || "No Status";
      const deliverySlot = page.properties["Fulfillment Method"]?.select?.name || "No Slot";
      const customerName = page.properties["Order Notes"]?.rich_text[0]?.text.content || "No Name"
      console.log(JSON.stringify(page, null, 2))
      // console.log(orderStatus)
      // console.log(deliverySlot)
      // console.log(customerName)
      console.log('\n'); // Adjust this to print the data you want
    });
  } catch (error) {
    console.error("Error fetching database:", error);
  }
}

// getDatabase();

// async function getHeaders() {
//   try {
//       const databaseId = process.env.NOTION_DATABASE_ID;
//       const response = await notion.databases.retrieve({ database_id: databaseId });

//       headings = Object.keys(response.properties)

//       console.log(headings);      
//       // return headings;
//   } catch (error) {
//     console.error("Error fetching database:", error);
//   }
//   headings.forEach((h) => {
//     const tag = `h$`
//   })
// }

// getHeaders();
