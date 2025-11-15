const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://argemmdev08_db_user:test123@cluster0.4cs7zs5.mongodb.net/url_shortener?appName=Cluster0";
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(MONGODB_URI);
  cachedDb = client.db('url_shortener_db');
  return cachedDb;
}

exports.handler = async (event) => {
  try {
    const db = await connectToDatabase();
    
    // Obtener código desde path
    const shortCode = event.pathParameters?.code;
    
    if (!shortCode) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Code is required' })
      };
    }
    
    // Buscar URL
    const url = await db.collection('urls').findOne({ shortCode });
    
    if (!url) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'URL not found' })
      };
    }
    
    // Incrementar clicks
    await db.collection('urls').updateOne(
      { shortCode },
      { $inc: { clicks: 1 } }
    );
    
    // Redirigir
    return {
      statusCode: 302,
      headers: {
        'Location': url.originalUrl
      },
      body: ''
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};