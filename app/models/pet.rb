class Pet < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_many :spotteds
  has_many :helpers, through: :orders, source: :user


  has_one_attached :photo
  
  geocoded_by :lost_location


  validates :name, presence: :true
  validates :species, presence: :true
  validates :description, presence: :true
  validates :lost_date, presence: :true
  after_validation :geocode 
end
