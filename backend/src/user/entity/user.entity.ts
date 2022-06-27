import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  Unique,
} from "typeorm";
import { Record } from "src/record/record.entity";
import { SecondAuthCode } from "src/second-auth/second-auth-code.entity";
import { Friends } from "./friends.entity";
import { Block } from "./block.entity";
import { UserState } from "../user-state.enum";
import { ChatParticipants } from "src/chat/entity/chat-participants.entity";
import { Achievement } from "src/achievement/achievement.entity";

@Entity()
@Unique(["nickname"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  apiId: number;

  @Column({ unique: true })
  nickname: string;

  @Column({ default: false })
  secondAuth: boolean;

  @Column({ default: "" })
  email: string;

  @Column({ default: 0 })
  personalWin: number;

  @Column({ default: 0 })
  personalLose: number;

  @Column({ default: 0 })
  ladderWin: number;

  @Column({ default: 0 })
  ladderLose: number;

  @Column({ default: "" })
  profileImg: string;

  @Column({ default: 0 })
  state: UserState;

  @Column({ default: 1 })
  level: number;

  @OneToMany(
    (type) => Record,
    (record) => {
      record.user, record.enemy;
    },
  )
  record: Record[];

  @OneToOne((type) => SecondAuthCode, (secondAuthCode) => secondAuthCode.user)
  secondAuthCode: SecondAuthCode;

  @OneToMany(
    (type) => Friends,
    (friends) => {
      friends.ownId, friends.friendsId;
    },
  )
  friends: Friends[];

  @OneToMany(
    (type) => Block,
    (block) => {
      block.ownId, block.blockId;
    },
  )
  block: Block;

  @OneToMany(
    (type) => ChatParticipants,
    (chatParticipants) => {
      chatParticipants.user;
    },
  )
  chatParticipants: ChatParticipants;

  @OneToOne(
    (type) => Achievement,
    (achievement) => {
      achievement.user;
    },
  )
  achievement: Achievement;
}
