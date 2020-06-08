class Pet < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_many :spotteds
  has_many :helpers, through: :orders, source: :user

  validates :name, presence :true
  validates :species, presence :true
  validates :description, presence :true
  validades :lost_date, presence :true
end
