class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    room = Room.find(message_params[:room_id])
    if message.save
      MessagesChannel.broadcast_to room, message
      head :ok
    end
  end
  
  private

  def message_params
    params.require(:message).permit(:text, :room_id, :user_id)
  end
end
