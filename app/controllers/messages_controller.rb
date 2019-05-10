class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    room = Room.find(message_params[:room_id])
    if message.save
      username = User.find(message[:user_id])[:username]
      broadcast_message = {username: username, message: message}
      MessagesChannel.broadcast_to room, broadcast_message
      puts message
      head :ok
    end
  end
  
  private

  def message_params
    params.require(:message).permit(:content, :room_id, :user_id)
  end
end
