import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'
import { ApiProperty } from "@nestjs/swagger";

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	@ApiProperty()
	email: string

	@prop()
	password: string

	@prop({ default: false })
	@ApiProperty()
	isAdmin?: boolean

	@prop({ default: [], ref: () => MovieModel })
	@ApiProperty()
	favorites?: Ref<MovieModel>[]
}
