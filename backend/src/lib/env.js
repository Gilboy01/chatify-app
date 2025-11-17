import 'dotenv/config';

export const ENV = {
PORT: process.env.PORT,
MONGO_URI:process.env.MONGO_URI,
NODE_ENV:process.env.NODE_ENV,
JWT_SECRET:process.env.JWT_SECRET,
RESEND_API_KEY:process.env.RESEND_API_KEY,
EMAIL_FROM: process.env.EMAIL_FROM,
EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME,
CLIENT_URL:process.env.CLIENT_URL
}

// PORT=3000
// MONGO_URI=mongodb+srv://gilbertmwega_db_user:GIVQHsPuF5HAJM0X@cluster0.41vhuqp.mongodb.net/chatify_db?appName=Cluster0
// NODE_ENV=development
// JWT_SECRET=my_JWT
// RESEND_API_KEY=re_WDvWWfLf_Aiue3W5eoBhKizuqwkQK8Hm8

// EMAIL_FROM="onboarding@resend.dev"
// EMAIL_FROM_NAME="Chatify"

// CLIENT_URL=http://localhost:5173