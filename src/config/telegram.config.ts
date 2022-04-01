import { ITelegramOptions } from 'src/telegram/telegram.interface'

export const getTelegramConfig = (): ITelegramOptions => ({
	// https://api.telegram.org/bot5070807616:AAGHWhiD9qTMz68gz6yccEXGRtY8x0ohOb0/getUpdates - for get chatId
	chatId: '',
	token: '',
})
