import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ApiProperty } from "@nestjs/swagger";

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
	@prop()
	@ApiProperty()
	name: string

	@prop({ unique: true })
	@ApiProperty()
	slug: string

	@prop()
	@ApiProperty()
	description: string

	@prop()
	@ApiProperty()
	icon: string
}
