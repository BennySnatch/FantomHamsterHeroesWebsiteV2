import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { getRank, getScore } from "../../../utils/functions/HamFunctions";
import { finalmeta } from "../../../utils/traitsfinal";

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
    const rank = getRank(query);
    const score = getScore(query);

    const rarity = { rank, score };

    res.statusCode = 200;
    res.send(rarity);
  } else {
    res.status(200).send("Not found");
  }
};

export default paperApi;
