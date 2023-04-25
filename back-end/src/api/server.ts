import app from './app.js'
import 'dotenv/config'
const port: number = +process.env.API_PORT! || 3001;
const server = app!.listen(port, () => console.log(`Api rodando na porta ${port}`));
export default server;
