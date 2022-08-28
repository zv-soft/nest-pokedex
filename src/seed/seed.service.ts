import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios

  constructor(
    private readonly pokemonService:PokemonService,
    
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ){}

  async seed() {

    await this.pokemonModel.deleteMany({})

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=500')

    const pokemonToInsert:{name:string, no:number}[] = []

    data.results.forEach(({name, url}) => {
      const segments = url.split('/')
      const no = +segments[segments.length-2]
      pokemonToInsert.push({name, no})
    });

    await this.pokemonModel.insertMany(pokemonToInsert)

    return {
      status:'OK'
    }
  }

}
