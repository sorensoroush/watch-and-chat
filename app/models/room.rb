class Room < ApplicationRecord
  has_many :users
  has_many :messages

  validates :title, presence: true
end
