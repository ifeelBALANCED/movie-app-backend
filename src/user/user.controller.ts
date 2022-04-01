import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { User } from './decorators/user.decorator'
import { UserService } from './user.service'
import { UpdateDto } from './dto/update.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { UserModel } from './user.model'
import { Types } from 'mongoose'
import { Auth } from "../auth/decorators/auth.decorator";
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MovieModel } from "../movie/movie.model";

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@ApiOkResponse({ type: UserModel })
	@ApiUnauthorizedResponse()
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.userService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@ApiUnauthorizedResponse()
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() data: UpdateDto) {
		return this.userService.updateProfile(_id, data)
	}

	@Get('profile/favorites')
	@ApiOkResponse({ type: MovieModel })
	@ApiUnauthorizedResponse()
	@Auth()
	async getFavorites(@User('_id') _id: string) {
		return this.userService.getFavoriteMovies(_id)
	}

	@Post('profile/favorites')
	@HttpCode(200)
	@ApiUnauthorizedResponse()
	@Auth()
	async toggleFavorite(
		@Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
		@User() user: UserModel
	) {
		return this.userService.toggleFavorite(movieId, user)
	}

	@Get('count')
	@ApiUnauthorizedResponse()
	@Auth('admin')
	async getCountUsers() {
		return this.userService.getCount()
	}

	@Get()
	@ApiUnauthorizedResponse()
	@ApiOkResponse({
		description: 'Array of User object',
		type: UserModel,
		isArray: true
	})
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({
		type: UserModel,
	})
	async getUser(@Param('id', IdValidationPipe) id: string) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@ApiUnauthorizedResponse()
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipe) id: string,
		@Body() data: UpdateDto
	) {
		return this.userService.updateProfile(id, data)
	}

	@Delete(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()

	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.userService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Movie not found')
	}
}
