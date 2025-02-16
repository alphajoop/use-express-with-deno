import express, { NextFunction, Request, Response } from "npm:express@4.21.2";
import data from "./data.json" with  { type: "json" };

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

const reqLogger = function (req: Request, _res: Request, next: NextFunction) {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

app.use(reqLogger);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json("Welcome to the Dinosaur API!");
});

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).json(data);
});

app.get("/api/:dinosaur", (req: Request, res: Response) => {
  if (req?.params?.dinosaur) {
    const found = data.find(
      (item) => item.name.toLowerCase() === req.params.dinosaur.toLowerCase()
    );
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(400).json({ message: "Dinosaurs not found" });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});
