import { Module } from "@nestjs/common";
import { EventsModule } from "../events/events.module";
import { SystemsController } from "./systems.controller";
import { SystemsService } from "./systems.service";

@Module({
  imports: [EventsModule],
  controllers: [SystemsController],
  providers: [SystemsService],
})
export class SystemsModule {}
