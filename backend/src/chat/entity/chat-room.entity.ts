import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ChatParticipant } from "./chat-participant.entity";

@Entity()
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "" })
  password: string;

  @Column()
  isDM: boolean;

  @OneToMany(
    (type) => ChatParticipant,
    (chatParticipant) => chatParticipant.chatRoom,
  )
  chatParticipant: ChatParticipant[];
}
