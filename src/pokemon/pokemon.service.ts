import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PokemonService {

  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.getOrThrow('defaultLimit')
  }


  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{

      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    }catch(error){
      this.handleExceptions(error)    
    }
    
  }

  async findAll(queryParameters) {

    const {offset=0, limit=this.defaultLimit} = queryParameters;
    return await this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no:1
    })
    .select('-__v');
  }

  async findOne(id: string) {

    let pokemon:Pokemon

    if(!isNaN(+id))    
      pokemon = await this.pokemonModel.findOne({no:id})
    if(!pokemon && isValidObjectId(id))
      pokemon =  await this.pokemonModel.findById(id)

    if(!pokemon)
      pokemon = await this.pokemonModel.findOne({name: id.toLowerCase().trim()})

    if(!pokemon)
      throw new NotFoundException('Pokemon Not Found')
    
    return pokemon
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    const pokemon = await this.findOne(id)    

    try{
      await pokemon.updateOne(updatePokemonDto, {new: true});

      return { ...pokemon.toJSON(), ...updatePokemonDto};
    }catch(error){
      this.handleExceptions(error)
    }

  }

  async remove(id: string) {   

    const pokemon = await this.pokemonModel.findByIdAndDelete(id)

    if(!pokemon)
      throw new NotFoundException(`Pokemon not found with MongoID ${id}`)
  }

  private handleExceptions ( error:any)
  {
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in DDBB, ${JSON.stringify(error.keyValue)}`)        
    }
    console.log(error)
    throw new InternalServerErrorException('Check server log')
  }
}
