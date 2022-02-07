import { Router, Response, Request } from "express";

let router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Wiki home page");
});

// About page route
router.get("/about", (req: Request, res: Response) => {
  res.send("About this wiki");
});

module.exports = router;
