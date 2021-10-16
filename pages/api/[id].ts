import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { HAM_ABI, HAM_ADDRESS } from "../../utils/contracts/HamContract";
import { getSupply } from "../../utils/functions/HamFunctions";
import { finalmeta } from "../../utils/traitsfinal";
const ethers = require("ethers");

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const paperApi = async (req: any, res: any) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ftm.tools/"
  );
  // const HAMSTER_ADDRESS = "0xE260BED39020f969BD66b4E2ffcc3c5A34B46A41";
  const hamContract = new ethers.Contract(HAM_ADDRESS, HAM_ABI, provider);
  const supply = await getSupply(hamContract);
  await cors(req, res);
  const query = req.query.id;

  if (query < supply) {
    const meta = finalmeta[query];
    const attributes = meta["attributes"];

    attributes.forEach((attribute) => attribute.frequency.toFixed(2));
    const newAtt: any = attributes.map(function callbackFn(attribute) {
      return { ...attribute, frequency: attribute.frequency.toFixed(2) };
    });

    const newMeta = { ...meta, attributes: newAtt };

    res.statusCode = 200;
    res.send(newMeta);
  } else if (query < 3333) {
    const data = {
      name: "Fantom Hamster Heroes #" + query,
      metadata: "Yet to be minted",
      image:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80",
    };
    res.status(200).send(data);
  } else {
    res.status(200).send("Not found");
  }
};

export default paperApi;
