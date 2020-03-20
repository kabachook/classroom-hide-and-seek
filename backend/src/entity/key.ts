import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Rule } from "./rule";

@Entity()
export class Key {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  private: string;

  @Column()
  public: string;

  @OneToOne(type => Rule)
  @JoinColumn({ name: "rule" })
  rule: Rule;
}
