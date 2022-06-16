import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Record } from "src/record/record.entity";
import { SecondAuthCode } from "src/second-auth/second-auth-code.entity";
import { Friends } from "./friends.entity";
import { Block } from "./block.entity";
import { UserState } from "./user-state.enum";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apiId: string;

  @Column()
  nickname: string;

  @Column()
  secondAuth: boolean;

  @Column()
  email: string;

  @Column()
  pWin: number;

  @Column()
  pLose: number;

  @Column()
  rWin: number;

  @Column()
  rLose: number;

  @Column()
  profileImg: string;

  @Column()
  state: UserState;

  @Column()
  level: number;

  @OneToOne((type) => Record, (record) => record.user, { eager: true })
  record: Record;

  @OneToMany(
    (type) => SecondAuthCode,
    (secondAuthCode) => secondAuthCode.user,
    {
      eager: false,
    },
  )
  secondAuthCode: SecondAuthCode;

  @OneToMany(
    (type) => Friends,
    (friends) => {
      friends.ownId, friends.friendsId;
    },
    { eager: false },
  )
  friends: Friends;

  @OneToMany(
    (type) => Block,
    (block) => {
      block.ownId, block.blockId;
    },
  )
  block: Block;
}
