import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { AdminModule } from './admin/admin.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReservationsModule } from './reservations/reservations.module';
import { LokiLoggerModule } from 'nestjs-loki-logger';
import { LoggerMiddleware } from './logs/LoggerMiddleware';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
     // MongooseModule.forRoot(
    //   `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_LINK}`
    // ),
    MongooseModule.forRoot(
      `mongodb+srv://mahdi:mahdi123@cluster0.sr2ks.mongodb.net/casadelpadel?retryWrites=true&w=majority`,
    ),


    LokiLoggerModule.forRoot({
      lokiUrl: 'http://localhost:3100',   // loki server
      labels: {
        'label': 'casa-padel',     // app level labels, these labels will be attached to every log in the application
      },
      logToConsole: true,
      gzip: false // contentEncoding support gzip or not
    }),

    UsersModule,
    TournamentsModule,
    AdminModule,
    SponsorsModule,
    MulterModule.register({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}