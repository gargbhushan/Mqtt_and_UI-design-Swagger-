import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, MqttRecordBuilder, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  // sumDataService(Payload:number[]){
  //   const response = Payload.reduce((a,b) => a+b , 0);
  //   const record = new MqttRecordBuilder(`${response}`)
  //   .setQoS(0)
  //   .build();
  //   this.client.send("FTF-input",record).subscribe(res => {
  //     console.log('response output',res,'>')
  //   })
  // }
  @Client({ transport: Transport.MQTT })

  public client: ClientProxy; 

  public async onModuleInit(): Promise<void> {
    Logger.log("Connecting");
    // await this.client.connect();
    Logger.log("Connected");
    // Logger.log("time for delay");
  }

  public sendMessage(): Observable<number> {
    const pattern: {} = { cmd: "sum" };
    const data: number[] = [5, 6];

    return this.client.send<number>(pattern, data);
  }


}
