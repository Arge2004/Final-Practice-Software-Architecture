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
    
    // Obtener estadísticas
    const totalUrls = await db.collection('urls').countDocuments();
    const totalClicks = await db.collection('urls').aggregate([
      { $group: { _id: null, total: { $sum: '$clicks' } } }
    ]).toArray();
    
    const stats = {
      totalUrls,
      totalClicks: totalClicks[0]?.total || 0
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(stats)
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};