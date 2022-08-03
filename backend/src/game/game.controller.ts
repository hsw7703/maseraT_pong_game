import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";
import { GameRoom } from "./entity/game-room.entity";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("/room")
  async gameRoomList(): Promise<GameRoom[]> {
    return this.gameService.gameRoomList();
  }

  @Get("/room/:gameRoomId")
  async gameRoomDetail(
    @Param("gameRoomId", ParseIntPipe) gameRoomId: number,
  ): Promise<GameRoomDetailDto> {
    return this.gameService.gameRoomDetail(gameRoomId);
  }
}
