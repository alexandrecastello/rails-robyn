class Spotted < ApplicationRecord
  belongs_to :user
  belongs_to :pet
  has_one_attached :photo
  geocoded_by :address
  # don't add ifs on after validation unless necessary edit spotted location
  after_validation :geocode 
end
