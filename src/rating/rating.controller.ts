import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'

import { Types } from 'mongoose'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'
import { Auth } from "../auth/decorators/auth.decorator";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { User } from "../user/decorators/user.decorator";
import { ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('Ratings')
@Controller('ratings')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@UsePipes(new ValidationPipe())
	@Post('set-rating')
	@ApiUnauthorizedResponse()
	@HttpCode(200)
	@Auth()
	async setRating(
		@User('_id') userId: Types.ObjectId,
		@Body()
		dto: SetRatingDto
	) {
		return this.ratingService.setRating(userId, dto)
	}

	@Get('/:movieId')
	@Auth()
	@ApiUnauthorizedResponse()

	async getMovieValueByUser(
		@Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
		@User('_id') userId: Types.ObjectId
	) {
		return this.ratingService.getMovieValueByUser(movieId, userId)
	}
}
