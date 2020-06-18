class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :pets, dependent: :destroy
  has_many :spotteds, dependent: :destroy
  has_many :helped_pets, through: :spotted, source: :pets
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :photo
  # after_create :send_welcome_email

  
  private

  def send_welcome_email
    UserMailer.with(user: self).welcome.deliver_now
  end

end
