import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/actor.model'
import { GenreModel } from 'src/genre/genre.model'
import { ApiProperty } from "@nestjs/swagger";

export interface MovieModel extends Base {}

export class Parameter {
	@prop()
	@ApiProperty()
	year: number

	@prop()
	@ApiProperty()
	duration: number

	@prop()
	@ApiProperty()
	country: string
}

export class MovieModel extends TimeStamps {
	@prop()
	@ApiProperty()
	poster: string

	@prop()
	@ApiProperty()
	bigPoster: string

	@prop({ unique: true })
	title: string

	@prop()
	@ApiProperty()
	parameters: Parameter

	@prop({ default: 4.0 })
	@ApiProperty()
	rating?: number

	@prop({ ref: () => GenreModel })
	@ApiProperty()
	genres: Ref<GenreModel>[]

	@prop({ default: 0 })
	@ApiProperty()
	countOpened?: number

	@prop({ unique: true })
	@ApiProperty()
	@ApiProperty()
	actors: Ref<ActorModel>[]

	@prop({ unique: true })
	@ApiProperty()
	slug: string

	@prop({ default: false })
	@ApiProperty()
	isSendTelegram?: boolean
}
