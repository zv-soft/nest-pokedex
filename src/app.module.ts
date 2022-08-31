import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

    MongooseModule.forRoot('mongodb+srv://pokemondb_users:A1HrUgvVKtEEhoFP@pokemoncluster.mmkyhdz.mongodb.net/test'),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}
