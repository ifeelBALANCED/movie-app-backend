import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from "../user/user.model";
import { MovieModel } from "../movie/movie.model";
import { ApiProperty } from "@nestjs/swagger";

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	@ApiProperty()
	userId: Ref<UserModel>

	@prop({ ref: () => MovieModel })
	@ApiProperty()
	movieId: Ref<MovieModel>

	@prop()
	@ApiProperty()
	value: number
}
