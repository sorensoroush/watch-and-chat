class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  belongs_to :room, optional: true
  has_many :comments
end
