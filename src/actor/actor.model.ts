import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ApiProperty } from "@nestjs/swagger";

export interface ActorModel extends Base {}

export class ActorModel extends TimeStamps {
	@prop()
	@ApiProperty()
	name: string

	@prop()
	@ApiProperty()
	photo: string

	@prop({ unique: true })
	@ApiProperty()
	slug: string
}
