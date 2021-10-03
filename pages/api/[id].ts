import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

const paperApi = async(req:any, res:any) => {


  await cors(req, res)
  const query = req.query.id;

  if(query<700){

  let url='https://gateway.pinata.cloud/ipfs/QmW7A4ZCWytGvnsGXBZ3NjMfwefgkLuJwSfaCFHoy7oKLA/'+query+'.json'
  const results = await fetch(url)
  const data = await results.json()
  // const filePath = path.resolve('.', 'public/assets/metadata/'+query+'.json')
  // const metaBuffer = fs.readFileSync(filePath)
  // let json = JSON.parse(metaBuffer.toString());
  res.statusCode = 200
  res.send(data)
}
else{
  res.status(404).send("Not found.");
}
}

export default paperApi