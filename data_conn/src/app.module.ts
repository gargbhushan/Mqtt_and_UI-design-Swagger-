import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HashtagEntity } from './hashtag/entities/hashtag.entity';
import { ProfileEntity } from './profile/entities/profile.entity';
import { UserEntity } from './user/entities/user.entity';
import { TweetEntity } from './tweet/entities/tweet.entity';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //[REQUIRED if want to use .env gloablly among all modules]
    }),
    ClientsModule.register([
      {
        name: 'TEST_CLIENT',
        transport:Transport.MQTT,
        options: {
          subscribeOptions:{qos:0},
          url : 'mqtt://104.198.63.61::1883',
        }
      },
  ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'data_con2',
        logging: true,
        entities: [HashtagEntity,ProfileEntity,UserEntity,TweetEntity],
        autoLoadEntities: true,
        keepConnectionAlive: true,
        // dropSchema:true,
        // synchronize: true,
      }),
       inject:[ConfigService],
    }),
    AppModule,
    UserModule,
    HashtagModule,
    ProfileModule,
    TweetModule,
    AuthModule,
  ],

  controllers: [
    AppController,
    MqttController
    //UserController,
    //HashtagController,
    //ProfileController,
    //TweetController,
  ],

  providers: [
    AppService,
    //UserService,
    //ProfileService,
    //HashtagService,
    //TweetService,
  ],
})
export class AppModule {}
