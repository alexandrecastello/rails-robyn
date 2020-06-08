class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :pets, dependent: :destroy
  has_many :spotteds, dependent: :destroy
  has_many :helped_pets, through: :spotted, source: :pets
  
  validates :name, presence :true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
