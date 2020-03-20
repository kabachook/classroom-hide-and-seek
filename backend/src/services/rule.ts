import { generateKeyPair } from "crypto";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import logger from "../loaders/logger";
import { Rule } from "../entity/rule";

@Service()
export default class RuleService {
  @InjectRepository(Rule)
  private ruleRepository: Repository<Rule>;

  private generateKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      generateKeyPair(
        "rsa",
        {
          modulusLength: 2048
        },
        (err, pubKey, _privKey) => {
          if (err) reject(err);

          resolve(
            pubKey
              .export({
                type: "spki",
                format: "pem"
              })
              .toString()
          );
        }
      );
    });
  }

  public async findRules(): Promise<Rule[]> {
    return this.ruleRepository.find({});
  }

  public async findRuleById(id: string): Promise<Rule> {
    return this.ruleRepository.findOne(id);
  }

  public async createRule(
    rule: Pick<Rule, "name" | "gitUrl" | "pattern">
  ): Promise<Rule> {
    logger.info("Creating new rule", rule);
    const newRule = new Rule();
    newRule.name = rule.name;
    newRule.gitUrl = rule.gitUrl;
    newRule.pattern = rule.pattern;
    newRule.sshKey = await this.generateKey();

    return this.ruleRepository.save(newRule);
  }
}
