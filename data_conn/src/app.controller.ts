import { Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, NatsContext, Payload } from '@nestjs/microservices';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';

@Controller('/auth')
export class AppController {
  constructor(private readonly authService: AuthService,
    // @Inject('MQTT_SERVICE') private client : ClientProxy, 
    ) {}

    // @Get('notifications')
    // getNotifications() {
    //   return this.client.send('notification_channel', "it's a msg from client")
    // }


    @MessagePattern("FTF-input")
    sumData(@Payload() Payload:String,@Ctx()context:MqttContext ):
    string{
      console.log("---newmsg");
      console.log("Payload",Payload);
      // console.log("Packet",context.getTopic());
      // console.log(typeof(Payload))
      if(typeof(Payload)=="string"){
        var L:string = Payload
        
        
        // var operations:string[] = ["ON","on","start","START","PLAY","play","Play"]
        // // console.log(operations[1])
        //  if(L in operations){
        
        //   console.log("http://localhost:3000/users/info")
        //   console.log("The operation can be start now")         
        // }
        if(L=="on"|| L =="ON" || L =="start" || L == "play" || L=="Play" || L == "On"){
          console.log("http://localhost:3000/users/info") // to perform in actual task we can return the value through the function
          console.log("The operation can be start now") 
        }
        if(L=="OFF" || L=="shutdown"|| L == "Close" || L == "close" || L == "shutdown"){
          console.log("APPlication is shutdown") // we using console because to check condition were working or not
        }
        
        
      }
      if(typeof(Payload)=="number"){
        var M : number,
        M = Payload + 5
        console.log(M)
      }
      
      // return Payload.slice +  `respond from logData() in -t  ${context.getTopic()}`;
      
      // console.log(typeof(Payload.charAt[1]))
      
      
       
      
      return Payload + `respond from logData() in -t ${context.getTopic()}`

    }


    @MessagePattern({cmd:"sum"})
    accumulate(data:number[]):number{
      return(data || []).reduce((a,b)=>a+b);
    }

    @MessagePattern('time.us.*')
    getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
        console.log(`Subject: ${context.getSubject()}`);
        return new Date().toLocaleTimeString;
    }

    // @MessagePattern("hallo").
    // suum(@Payload()Payload:number,@Ctx() res:MqttContext):
    // number{
    //   const response = Payload.reduce((a,b) => a+b , 0);
    //   const record = new MqttRecordBuilder(`${response}`)
    //   .setQoS(0)
    //   .build();
    //   this.client.send("FTF-input",record).subscribe(res => {
    //     console.log('response output',res,'>')
    //   })
    // }
    // @MessagePattern("helo")
    // sum(@Payload()Payload:string,@Get() Get:MqttContext):number{}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protect')
  getProtect(@Request() req) {
    return req.user;
  }
}
