class RemoveRoomOwnerFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :room_owner, :boolean
  end
end
