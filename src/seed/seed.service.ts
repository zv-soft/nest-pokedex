import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {



  constructor(   

    private readonly http:AxiosAdapter,

    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
    
  ){}

  async seed() {

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=500')

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
