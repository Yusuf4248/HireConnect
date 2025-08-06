import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { JobSeekersModule } from './job_seekers/job_seekers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false,
    }),
    UsersModule,
    JobSeekersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
