import { generateKeyPair } from "crypto";
import forge from "node-forge";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Key } from "../entity/key";
import { Rule } from "../entity/rule";
import logger from "../loaders/logger";
import { ObjectId } from "mongodb";

@Service()
export default class RuleService {
  @InjectRepository(Rule)
  private ruleRepository: Repository<Rule>;

  @InjectRepository(Key)
  private keyRepository: Repository<Key>;

  private generateKey(): Promise<KeyPair> {
    return new Promise((resolve, reject) => {
      generateKeyPair(
        "rsa",
        {
          modulusLength: 2048
        },
        (err, pubKey, privKey) => {
          if (err) reject(err);

          const keyPair = {
            publicKey: pubKey
              .export({ type: "spki", format: "pem" })
              .toString(),
            privateKey: privKey
              .export({ type: "pkcs8", format: "pem" })
              .toString()
          };
          resolve(keyPair);
        }
      );
    });
  }

  public async findKeyByRuleId(id: string | ObjectId): Promise<Key> {
    return (
      await this.keyRepository.find({
        where: {
          "rule.id": {
            $eq: new ObjectId(id)
          }
        }
      })
    )[0];
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

    let newRule = new Rule();
    newRule.name = rule.name;
    newRule.gitUrl = rule.gitUrl;
    newRule.pattern = rule.pattern;

    const keyPair = await this.generateKey();
    newRule.sshKey = forge.ssh.publicKeyToOpenSSH(
      forge.pki.publicKeyFromPem(keyPair.publicKey),
      "CHS"
    );

    const key = new Key();
    key.private = forge.ssh.privateKeyToOpenSSH(
      forge.pki.privateKeyFromPem(keyPair.privateKey)
    );
    key.public = newRule.sshKey;

    newRule = await this.ruleRepository.save(newRule);
    key.rule = newRule;
    await this.keyRepository.save(key);
    return newRule;
  }
}
