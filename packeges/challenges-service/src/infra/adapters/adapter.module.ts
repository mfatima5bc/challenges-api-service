import { HttpAdapter } from "@/core/types/http-adapter";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AxiosAdapter } from "./axios/axios.service";

@Module({
  imports: [HttpModule],
  providers:  [{ provide: HttpAdapter, useClass: AxiosAdapter }], // [AxiosAdapter], // [{ provide: HttpAdapter, useClass: AxiosAdapter }]
  exports: [HttpAdapter]
})
export class AdapterModule {}
