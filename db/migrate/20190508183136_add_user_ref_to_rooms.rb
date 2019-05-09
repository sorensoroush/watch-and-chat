class AddUserRefToRooms < ActiveRecord::Migration[5.2]
  def change
    add_reference :rooms, :owner, index: true
    add_foreign_key :rooms, :users, column: :owner_id
  end
end
