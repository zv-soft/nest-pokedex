import { Injectable } from '@nestjs/common';
import  axios, { AxiosInstance } from 'axios'
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios

  constructor(
    private readonly pokemonService:PokemonService
  ){}

  async seed() {

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=5')

    data.results.forEach(({name, url}) => {
      const segments = url.split('/')
      const no = +segments[segments.length-2]
      console.log({name, no})
    });

    return data.results[0].name
  }

}
