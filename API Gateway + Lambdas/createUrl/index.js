const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb+srv://argemmdev08_db_user:test123@cluster0.4cs7zs5.mongodb.net/url_shortener?appName=Cluster0";
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  const client = await MongoClient.connect(MONGODB_URI);
  cachedDb = client.db('url_shortener_db'); 
  return cachedDb;
}

exports.handler = async (event) => {
  try {
    const db = await connectToDatabase();
    const body = JSON.parse(event.body);
    
    // Tu lógica para crear URL corta
    const urlData = {
      originalUrl: body.originalUrl,
      shortCode: generarCodigoAleatorio(), // Implementa esta función
      createdAt: new Date(),
      clicks: 0
    };
    
    const result = await db.collection('urls').insertOne(urlData);
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: urlData
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function generarCodigoAleatorio() {
  return Math.random().toString(36).substring(2, 8);
}