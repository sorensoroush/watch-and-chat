class Room < ApplicationRecord
  has_many :users
  has_many :messages
  belongs_to :owner, class_name: 'User'
  
  validates :title, presence: true
end
