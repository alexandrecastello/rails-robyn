class Spotted < ApplicationRecord
  belongs_to :user
  belongs_to :pet

  geocoded_by :address
  # don't add ifs on after validation unless necessary edit spotted location
  after_validation :geocode 
end
