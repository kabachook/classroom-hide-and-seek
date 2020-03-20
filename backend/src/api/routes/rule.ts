import { Request, Response, Router } from "express";
import Container from "typedi";
import { check } from "express-validator";
import RuleService from "../../services/rule";
import { validate } from "../utils/validator";

export default (app: Router) => {
  const ruleService = Container.get(RuleService);

  app.get("/rules", async (req: Request, res: Response) => {
    const rules = await ruleService.findRules();
    res.status(200).json({ ok: true, data: rules });
  });

  app.post("/rule", async (req: Request, res: Response) => {
    const rule = await ruleService.createRule({
      name: req.body.name,
      gitUrl: req.body.gitUrl,
      pattern: req.body.pattern
    });

    res.status(200).json({
      ok: true,
      data: rule
    });
  });

  app.get("/rule/:id", async (req: Request, res: Response) => {
    const id = req.params["id"];
    const rule = await ruleService.findRuleById(id);

    res.status(200).json({
      ok: true,
      data: rule
    });
  });
};
