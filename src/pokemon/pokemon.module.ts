import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, ConfigService],
  exports:[PokemonService, MongooseModule ],
  imports:[
    MongooseModule.forFeature([{
      name: Pokemon.name,
      schema:PokemonSchema,
    }])
  ]
})
export class PokemonModule {}
