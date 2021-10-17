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
  await cors(req, res);
  const query = req.query.id;

  if (query < 3333) {
    const meta = finalmeta[query];
    const attributes = meta["attributes"];

    attributes.forEach((attribute) => attribute.frequency.toFixed(2));
    const newAtt: any = attributes.map(function callbackFn(attribute) {
      return { ...attribute, frequency: attribute.frequency.toFixed(2) };
    });

    const newMeta = { ...meta, attributes: newAtt };

    res.statusCode = 200;
    res.send(newMeta);
  } else {
    res.status(200).send("Not found");
  }
};

export default paperApi;
