import crypto from "crypto";
import { MigrationInterface, QueryRunner } from "typeorm";
import { Rule } from "../entity/rule";

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class init1584709318154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<Rule> {
    const ruleRepository = await queryRunner.manager.getMongoRepository(Rule);

    const rule = new Rule();
    rule.name = "Test rule";
    rule.gitUrl = "git@github.com:kabachook/hidden-tests";
    rule.pattern = "task10-*";
    rule.connected = false;
    rule.sshKey = crypto
      .generateKeyPairSync("rsa", { modulusLength: 2048 })
      .publicKey.export({ type: "spki", format: "pem" })
      .toString();
    return ruleRepository.save(rule);
  }

  public async down(queryRunner: QueryRunner): Promise<Rule> {
    const ruleRepository = await queryRunner.manager.getMongoRepository(Rule);

    const rule = await ruleRepository.findOne({ name: "Test rule" });
    return ruleRepository.remove(rule);
  }
}
