import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Rule {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  gitUrl: string;

  @Column()
  pattern: string;

  @Column()
  connected: boolean;

  @Column()
  sshKey: string;
}
