class Room < ApplicationRecord
  has_many :users, :messages
end
