import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes';
import swaggerSetup from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(jobRoutes);
swaggerSetup(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
