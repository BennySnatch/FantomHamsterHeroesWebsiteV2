import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import { HAM_ABI, HAM_ADDRESS } from '../../utils/contracts/HamContract';
import { getSupply } from '../../utils/functions/HamFunctions';
import { finalmeta } from '../../utils/traitsfinal';
const ethers = require("ethers");

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

const paperApi = async(req:any, res:any) => {

  // const provider = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.fantom.network/')
const hamContract=new ethers.Contract(
  HAM_ADDRESS,
  HAM_ABI,
  provider
);
const supply=await getSupply(hamContract)
  await cors(req, res)
  const query = req.query.id;

  if(query<supply){

  // let url='https://gateway.pinata.cloud/ipfs/QmW7A4ZCWytGvnsGXBZ3NjMfwefgkLuJwSfaCFHoy7oKLA/'+query+'.json'
  // const results = await fetch(url)
  // const data = await results.json()
  const meta=finalmeta[query]

  res.statusCode = 200
  res.send(meta)
}
else if(query<3333){
  const data={
    name:"Fantom Hamster Heroes #"+query,
    metadata:"Yet to be minted",
    image:"https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
  }
  res.status(200).send(data);
}else{
  res.status(200).send("Not found");
}
}

export default paperApi