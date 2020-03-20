import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { Rule } from "./rule";

@Entity()
export class Key {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  private: string;

  @Column()
  public: string;

  @Column(type => Rule)
  rule: Rule;
}
